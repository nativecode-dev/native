import * as express from 'express'
import { Server } from 'typescript-rest'

export class ApiServer {
  private readonly app: express.Application

  constructor() {
    this.app = express()
    Server.buildServices(this.app, 'controllers/*')
  }

  start(hostname: string, port: number) {
    return new Promise<void>((resolve, reject) => {
      this.app.listen(port, hostname, () => {
        resolve()
      })
    })
  }
}
