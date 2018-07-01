export * from './IrcQueue'
export * from './IrcQueueConsumer'
export * from './QueueConnection'
export * from './TorrentLink'

import { URL } from 'url'

export const CreateQueueUrl = (host: string, port: number = 5672, username: string, password: string, vhost: string) => {
  const url = new URL(`amqp://${host}`)
  url.username = username
  url.password = password
  url.pathname = vhost
  url.port = port.toString()
  return url
}
