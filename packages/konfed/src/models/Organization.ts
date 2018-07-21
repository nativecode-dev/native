import { Identifier } from './Identifier'

export interface Organization {
  id(): Identifier
  parent(): Organization
}
