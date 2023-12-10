import { Redis } from "@upstash/redis"
import type { VercelRequest, VercelResponse } from "@vercel/node"

const redis = Redis.fromEnv()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Method not allowed", status: 405})
  }

  const { eventId } = req.query

  if (!eventId) {
    res.status(400).send({ message: "Event ID not passed", status: 400 })
  }

  // Fetch views counts for the given slug
  const keys = await redis.keys(`pageviews:page:event-${eventId}:*`)
  const viewsData = await Promise.all(
    keys.map(async (key) => {
      const date = key.split(":").pop() // Extract date from the key
      const views: any = await redis.get(key)
      return { date, views: parseInt(views) }
    }),
  )

  res.status(200).send({ message: "views fetched successfully", views: viewsData, status: 200 })
}
