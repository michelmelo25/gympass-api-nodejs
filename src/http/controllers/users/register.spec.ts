import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { GerarEmailAleatorio } from '@/utils/test/create-random-email'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoul be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: GerarEmailAleatorio(),
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
