import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/index-browser'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    vi.useFakeTimers()

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      phone: '',
      description: '',
      latitude: new Decimal(-3.7529244),
      longitude: new Decimal(-38.5297975),
    })

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      phone: '',
      description: '',
      latitude: -3.7529244,
      longitude: -38.5297975,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2025, 0, 25, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.7529244,
      userLonitude: -38.5297975,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 25, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.7529244,
      userLonitude: -38.5297975,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -3.7529244,
        userLonitude: -38.5297975,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 25, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.7529244,
      userLonitude: -38.5297975,
    })

    vi.setSystemTime(new Date(2025, 0, 26, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -3.7529244,
      userLonitude: -38.5297975,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2025, 0, 25, 8, 0, 0))
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      phone: '',
      description: '',
      latitude: new Decimal(-3.7257092),
      longitude: new Decimal(-38.567875),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -3.7529102,
        userLonitude: -38.5289011,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
    // Localização proxima -100m
    // userLatitude: -3.7529102,
    // userLonitude: -38.5289011,

    // expect(checkIn.id).toEqual(expect.any(String))
  })
})
