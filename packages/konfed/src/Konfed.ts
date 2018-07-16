import { URL } from 'url'

import { Logger } from './Logger'

export class Konfed {
  private readonly log = Logger

  constructor(couchbase: URL) {
    this.log.debug('couchbase', couchbase.toString())
  }
}
