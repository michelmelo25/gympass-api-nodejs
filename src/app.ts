import fastify from 'fastify'
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Carregue a URL do DB do processo (geralmente via .env)
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

// Crie o pool de conexão do driver e o adaptador
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const app = fastify()

const prisma = new PrismaClient({
  adapter,
})

prisma.user.create({
  data: {
    name: 'Mihel',
    email: 'michel@mail.com',
  },
})
