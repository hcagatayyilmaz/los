import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function getAllRewards() {
    const rewards = await prisma.reward.findMany()
    return rewards
}

export async function getAttractions(cityId: string) {
    "use server"
    const now = new Date()

    const attractions = await prisma.attraction.findMany({
        where: {
            cityId,
            isActive: true,
            OR: [
                {
                    startDate: {
                        lte: now
                    },
                    endDate: {
                        gte: now
                    }
                },
                {
                    startDate: null,
                    endDate: null
                }
            ]
        }
    })
    return attractions
}
