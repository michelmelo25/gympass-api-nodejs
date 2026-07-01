import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { GerarEmailAleatorio } from '@/utils/test/create-random-email'

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to Authenticate', async () => {
    const email = GerarEmailAleatorio()
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: email.toString(),
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: email.toString(),
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
