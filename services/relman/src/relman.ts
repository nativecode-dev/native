import { CLI, ConsoleOptions } from '@nofrills/console'
import { IrcQueueConsumer, Envelope } from '@ncpub/irc-pubsub'
import { URL } from 'url'

async function initialize() {
  const url = new URL(process.env['URL_QUEUE'] || 'amqp://localhost')
  const consumer = new IrcQueueConsumer(url)
  consumer.subscribe(envelope => {
    envelope.message.nack()
  })
}

async function main() {
  const options: ConsoleOptions = {
    initializer: initialize
  }

  const exe = process.argv[0]
  const args = process.argv.splice(1)
  const console = new CLI<ConsoleOptions>(options, exe, args)

  await console.start()
}

main().catch(console.error)
