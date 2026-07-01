import crypto from 'crypto'

export function GerarEmailAleatorio() {
  const randomString = crypto.randomBytes(8).toString('hex')
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'exemplo.com']
  const randomDomain = domains[Math.floor(Math.random() * domains.length)]

  return `${randomString}@${randomDomain}`
}
