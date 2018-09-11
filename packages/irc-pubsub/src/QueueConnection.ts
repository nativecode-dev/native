import { URL } from 'url'
import { Connection } from 'amqp-ts'
import { Subject } from 'rxjs'

import { Lincoln, Logger } from './Logger'

export abstract class QueueConnection<T> extends Subject<T> {
  protected readonly connection: Connection
  protected readonly logger: Lincoln = Logger.extend('queue')

  constructor(url: URL) {
    super()

    this.connection = new Connection(url.toString())
  }

  connect() {
    return Promise.resolve(this.connection.completeConfiguration())
  }
}
