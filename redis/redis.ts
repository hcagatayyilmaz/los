import {createClient} from "redis"

let redisClient: ReturnType<typeof createClient> | null = null

export async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_URL,
        port: 19299
      }
    })

    redisClient.on("error", (err: Error) =>
      console.error("Redis Client Error", err)
    )

    await redisClient.connect()
  }

  return redisClient
}

export async function closeRedisConnection() {
  if (redisClient) {
    await redisClient.quit()
    redisClient = null
  }
}
