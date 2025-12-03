export class MaxNumberOfCheckinsError extends Error {
  constructor() {
    super('Max of number check-ins reached.')
  }
}
