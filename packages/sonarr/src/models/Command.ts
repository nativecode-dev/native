export interface Command {
  name: string
  startedOn: Date
  stateChangeTime: Date
  sendUpdatesToClient: boolean
  state: string
  id: number
}
