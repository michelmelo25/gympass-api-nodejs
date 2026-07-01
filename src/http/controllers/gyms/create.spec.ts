import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoul be able to create a gym', async () => {
    const token = await CreateAndAuthenticateUser(app)
    console.log('Iniciando criacao de academia')
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'The Javaa',
        phone: '88 9 83745695',
        latitude: -3.7257092,
        longitude: -38.567875,
      })

    expect(response.statusCode).toEqual(201)
  })
})
