export interface CommandInfo {
  name: string
  body: {
    sendUpdatesToClient: boolean
    updateScheduledTask: boolean
    completionMessage: string
    name: string
    trigger: string
  }
  priority: string
  status: string
  queued: Date
  trigger: string
  state: string
  manual: boolean
  startedOn: Date
  sendUpdatesToClient: boolean
  updateScheduledTask: boolean
  id: number
}
