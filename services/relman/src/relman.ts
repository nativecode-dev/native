import { CLI, ConsoleOptions, IConsole } from '@nofrills/console'

async function initialize() {
  await console.start(process.argv[0], ...process.argv.splice(1))
}

async function main() {
  const options: ConsoleOptions = {
    initializer: initialize
  }
  const console = new CLI<ConsoleOptions>(options)

}

main().catch(console.error)
