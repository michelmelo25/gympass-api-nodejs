import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'The Javaa',
      phone: '88 9 83745695',
      latitude: -3.7257092,
      longitude: -38.567875,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'The Javaa',
      phone: '88 9 83745695',
      latitude: -4.9699222,
      longitude: -39.0158078,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.7529102,
      userLongitude: -38.5289011,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
