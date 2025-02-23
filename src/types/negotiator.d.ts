declare module 'negotiator' {
  export default class Negotiator {
    constructor(options: { headers: Record<string, string> })
    languages(): string[]
  }
}
