export interface Status {
  appData: string
  authentication: string
  branch: string
  buildTime: Date
  isAdmin: boolean
  isDebug: boolean
  isLinux: boolean
  isMono: boolean
  isMonoRuntime: boolean
  isOsx: boolean
  isProduction: boolean
  isUserInteractive: boolean
  isWindows: boolean
  osVersion: string
  runtimeVersion: string
  sqliteVersion: string
  startupPath: string
  urlBase: string
  version: string
}
