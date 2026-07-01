import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, replay: FastifyReply) {
  const validateCheckInsParamsSchema = z.object({
    checkInId: z.uuid(),
  })

  const { checkInId } = validateCheckInsParamsSchema.parse(request.params)

  const validateCheckInsUseCase = makeValidateCheckInUseCase()

  await validateCheckInsUseCase.execute({
    checkInId,
  })

  return replay.status(204).send()
}
