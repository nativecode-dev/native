import { IrcQueue } from '@ncpub/irc-pubsub'
import { URL } from 'url'

import { IrcWatch } from './IrcWatch'
import { Logger } from './Logger'

async function run() {
  const url_queue = new URL(process.env['URL_QUEUE'] || 'amqp://localhost')
  Logger.info(`starting queue [${url_queue.toString()}]...`)
  const queue = new IrcQueue(url_queue)
  await queue.connect()

  const url_irc = new URL(process.env['URL_IRC'] || 'irc://locahost')
  Logger.info(`starting watcher [${url_irc.toString()}]...`)
  const irc = new IrcWatch(queue, url_irc, 0)
  await irc.connect()
}

run().catch(console.log)
