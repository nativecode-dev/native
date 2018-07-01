import { Connection } from 'amqp-ts'
import { Subject } from 'rxjs'

import { Logger } from './Logger'

export abstract class QueueConnection<T> extends Subject<T> {
  protected readonly connection: Connection
  protected readonly logger = Logger.extend('queue')

  constructor(url: URL) {
    super()

    this.connection = new Connection(url.toString())
  }

  connect() {
    return Promise.resolve(this.connection.completeConfiguration())
  }
}
