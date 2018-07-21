export interface Identifier {
  key(): string
  name(): string
  organization(): Identifier | null
}
