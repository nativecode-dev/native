import * as colors from 'irc-colors'

import { IrcQueue, TorrentLink } from '@ncpub/irc-pubsub'
import { Client } from 'ircv3'
import { ConnectionInfo } from 'ircv3/lib/Connection/Connection'
import { PrivateMessage } from 'ircv3/lib/Message/MessageTypes/Commands'
import { URL } from 'url'

import { Logger } from './Logger'

export class IrcWatch {
  private readonly irclient: Client

  private readonly logger = Logger

  private retries: number = 0

  constructor(
    private readonly queue: IrcQueue,
    private readonly url: URL,
    private readonly retryCount?: number
  ) {
    const connection: ConnectionInfo = {
      hostName: url.hostname,
      nick: url.username,
      port: Number(url.port),
    }

    this.irclient = new Client({ connection, debugLevel: 0 })
  }

  protected get client(): Client {
    return this.irclient
  }

  connect(): Promise<void> {
    this.retries = 0

    this.client.onConnect(this.onConnect)
    this.client.onDisconnect(this.onDisconnect)
    this.client.onPrivmsg(this.onPrivateMessage)
    this.client.onRegister(() => this.onRegister(this.url.pathname.substr(1)))

    return this.client.connect()
  }

  protected normalizeChannelName(channel: string): string {
    if (channel && channel.startsWith('#')) {
      return channel
    }

    return `#${channel}`
  }

  private onConnect = () => {
    this.logger.info(`connected to ${this.url.toString()} as ${this.url.username}`)
  }

  private onDisconnect = (reason?: Error) => {
    if (reason) {
      this.logger.error(reason)
    }

    if (this.retryCount === undefined) {
      return
    }

    if (this.retries < this.retryCount) {
      this.retries++
    }

    const timeout = this.retries * this.retryCount * 1000

    setTimeout(async () => {

      this.logger.debug(`reconnecting, waiting ${timeout / 1000} seconds...`)
      await this.client.reconnect()

    }, timeout)
  }

  private onPrivateMessage = (target: string, user: string, text: string, message: PrivateMessage) => {
    if (target === '#announce' && user === 'Announce') {
      try {
        const clean = colors.stripColorsAndStyle(message.params.message)
        const pattern = /(?:(\w+):\s\(\s([\w\.\-\_\s\?\=\/\:]+)\s\))+/g

        const link: Partial<TorrentLink> = {}

        let matches: RegExpExecArray | null
        // tslint:disable-next-line:no-conditional-assignment
        while ((matches = pattern.exec(clean)) !== null) {
          const key = matches[1].toLowerCase()
          const value = matches[2]
          link[key] = value
        }

        this.logger.debug('privmsg', link)
        this.queue.enqueue(link as TorrentLink)

      } catch (error) {
        this.logger.error(error, text, target, user)
      }
    }
  }

  private onRegister = (channel: string) => {
    const channelName = this.normalizeChannelName(channel)
    this.client.join(channelName)
    this.logger.info(`listening for new messages in ${channelName}`)
  }
}
