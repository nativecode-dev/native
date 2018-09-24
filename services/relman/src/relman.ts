import { URL } from 'url'
import { IrcQueueConsumer } from '@ncpub/irc-pubsub'
import { CLI, ConsoleOptions, ProcessArgs } from '@nofrills/console'

async function main() {
  const options: ConsoleOptions = {
    initializer: async () => {
      const url = new URL(process.env['URL_QUEUE'] || 'amqp://localhost')
      const consumer = new IrcQueueConsumer(url)
      consumer.subscribe(envelope => {
        envelope.message.nack()
      })
    },
  }

  const args = ProcessArgs.from(process.argv)
  const console = CLI.create<ConsoleOptions>(options, args)

  await console.start()
}

main().catch(console.error)
