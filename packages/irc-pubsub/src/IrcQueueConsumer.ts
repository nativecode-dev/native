import { Exchange, Message, Queue } from 'amqp-ts'
import { QueueConnection } from './QueueConnection'
import { TorrentLink } from './TorrentLink'

export class IrcQueueConsumer extends QueueConnection<TorrentLink> {
  private readonly exchange: Exchange
  private readonly queue: Queue

  constructor(url: URL) {
    super(url)

    const name = url.pathname.substr(1)
    this.exchange = this.connection.declareExchange(name, 'fanout', { durable: true })
    this.queue = this.connection.declareQueue(name, { durable: true })
    this.queue.bind(this.exchange)
    this.queue.activateConsumer(this.dequeue, { consumerTag: `${process.pid}:${process.getuid()}` })
  }

  private dequeue = (message: Message) => {
    try {
      const content = message.getContent()
      this.logger.debug(content)
      this.next(content)
      message.ack()
    } catch (error) {
      this.logger.error(error)
      message.nack()
    }
  }
}
