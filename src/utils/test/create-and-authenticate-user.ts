import { FastifyInstance } from 'fastify'
import request from 'supertest'
import crypto from 'crypto'

function gerarEmailAleatorio() {
  const stringAleatoria = crypto.randomBytes(8).toString('hex')
  const dominios = ['gmail.com', 'yahoo.com', 'outlook.com', 'exemplo.com']
  const dominioAleatorio = dominios[Math.floor(Math.random() * dominios.length)]

  return `${stringAleatoria}@${dominioAleatorio}`
}

export async function CreateAndAuthenticateUser(app: FastifyInstance) {
  const email = gerarEmailAleatorio()
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: email.toString(),
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: email.toString(),
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
