import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gym-use-case'

export async function nearby(request: FastifyRequest, replay: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query)

  const fetchNearvyGymUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearvyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return replay.status(200).send({ gyms })
}
