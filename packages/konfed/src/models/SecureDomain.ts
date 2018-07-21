import { Identifier } from './Identifier'

export interface SecureDomain {
  app(): Identifier
  host(): string
  tld(): string
}
