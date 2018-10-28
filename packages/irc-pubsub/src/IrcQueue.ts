import { Exchange, Message } from 'amqp-ts'
import { URL } from 'url'
import { TorrentLink } from './TorrentLink'
import { QueueConnection } from './QueueConnection'

export class IrcQueue extends QueueConnection<TorrentLink> {
  private readonly exchange: Exchange

  constructor(url: URL) {
    super(url)

    const name = url.pathname.substr(1)
    this.exchange = this.connection.declareExchange(name, 'fanout', { durable: true })
  }

  enqueue(link: TorrentLink) {
    const message = new Message(link)
    this.logger.debug('enqueue', message)
    this.exchange.send(message)
    this.next(link)
  }
}

