import { URL } from 'url'

import { Logger } from './Logger'

export class Konfed {
  private readonly logger = Logger

  constructor(couchbase: URL) {
    this.logger.debug('couchbase', couchbase.toString())
  }
}
