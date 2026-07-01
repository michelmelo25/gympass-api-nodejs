import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, replay: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInsParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createCheckInsUseCase = makeCheckInUseCase()

  await createCheckInsUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLonitude: longitude,
  })

  return replay.status(201).send()
}
