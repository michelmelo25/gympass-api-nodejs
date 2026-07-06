import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoul be able to list nearby gyms', async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'The Javaa',
        phone: '88 9 83745695',
        latitude: -3.7257092,
        longitude: -38.567875,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'The Typeeee',
        phone: '88 9 83745183',
        latitude: -4.9699222,
        longitude: -39.0158078,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -3.7257092,
        longitude: -38.567875,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    // expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toContainEqual(
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    )
  })
})
