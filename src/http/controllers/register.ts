import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterCaseUse } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterCaseUse()

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return replay.status(409).send({ message: error.message })
    }
    return replay.status(500).send()
  }

  return replay.status(201).send()
}
