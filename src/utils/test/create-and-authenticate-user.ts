import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { GerarEmailAleatorio } from './create-random-email'

export async function CreateAndAuthenticateUser(app: FastifyInstance) {
  const email = GerarEmailAleatorio()
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

  return { token, email }
}
