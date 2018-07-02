import { CLI, ConsoleOptions } from '@nofrills/console'

async function initialize() {
  return Promise.resolve()
}

async function main() {
  const options: ConsoleOptions = {
    initializer: initialize
  }
  const console = new CLI<ConsoleOptions>(options, process.argv[0], process.argv.splice(1))
  console.start()
}

main().catch(console.error)
