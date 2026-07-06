import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { GerarEmailAleatorio } from './create-random-email'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function CreateAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const email = GerarEmailAleatorio()

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: email.toString(),
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: email.toString(),
    password: '123456',
  })

  const { token } = authResponse.body

  return { token, email }
}
