import { IrcQueue } from '@ncpub/irc-pubsub'
import { URL } from 'url'

import { IrcWatch } from './IrcWatch'
import { Logger } from './Logger'

async function run() {
  const urlQueue = new URL(process.env['URL_QUEUE'] || 'amqp://localhost')
  Logger.info(`starting queue [${urlQueue.toString()}]...`)
  const queue = new IrcQueue(urlQueue)
  await queue.connect()

  const urlIrc = new URL(process.env['URL_IRC'] || 'irc://locahost')
  Logger.info(`starting watcher [${urlIrc.toString()}]...`)
  const irc = new IrcWatch(queue, urlIrc, 0)
  await irc.connect()
}

run().catch(console.log)
