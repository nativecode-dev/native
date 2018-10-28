declare module 'irc-colors' {
  export function stripColors(source: string): string
  export function stripStyle(source: string): string
  export function stripColorsAndStyle(source: string): string
}
