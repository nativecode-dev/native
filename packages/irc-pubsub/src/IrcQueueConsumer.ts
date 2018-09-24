import { URL } from 'url'
import { Exchange, Message, Queue } from 'amqp-ts'

import { QueueConnection } from './QueueConnection'
import { TorrentLink } from './TorrentLink'

export interface Envelope {
  message: Message
  torrent: TorrentLink
}

export class IrcQueueConsumer extends QueueConnection<Envelope> {
  private readonly exchange: Exchange
  private readonly queue: Queue

  constructor(url: URL) {
    super(url)

    const name = url.pathname.substr(1)
    this.exchange = this.connection.declareExchange(name, 'fanout', {
      durable: true,
    })
    this.queue = this.connection.declareQueue(name, { durable: true })
    this.queue.bind(this.exchange)
    this.queue.activateConsumer(this.dequeue, {
      consumerTag: `${process.pid}:${process.getuid()}`,
    })
  }

  private dequeue = (message: Message) => {
    try {
      const torrent = message.getContent()
      this.logger.debug(torrent)
      this.next({ message, torrent })
    } catch (error) {
      this.logger.error(error)
    }
  }
}
