import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function getAllRewards() {
    const rewards = await prisma.reward.findMany()
    return rewards
}
