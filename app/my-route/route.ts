import { getPayload } from 'payload'
import config from '@payload-config'

export const GET = async () => {
  const payload = await getPayload({ config })
  
  // Exemple d'utilisation de payload
  const users = await payload.find({ collection: 'users', limit: 1 })
  
  return Response.json({ message: 'Hello, Next.js!', userCount: users.totalDocs })
}
