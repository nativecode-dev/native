import { IrcWatch } from './IrcWatch'
import { CreateQueueUrl, IrcQueue } from '@ncpub/irc-pubsub'

async function run() {
  process.env['AMQPTS_LOGLEVEL'] = 'info'

  const url = CreateQueueUrl('queue.nativecode.com', undefined, 'ircwatch', 'irc.watch', 'ircwatch')

  console.log(`starting queue [${url.toString()}]...`)
  const queue = new IrcQueue(url)
  await queue.connect()

  console.log('starting watcher...')
  const irc = new IrcWatch(queue, 'irc.xspeeds.eu', undefined, 0)
  await irc.connect('announce')
}

run().catch(console.log)
