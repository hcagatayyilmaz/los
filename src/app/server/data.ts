import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function getAllRewards() {
    const rewards = await prisma.reward.findMany()
    return rewards
}

export async function getAttractions(cityId: string, filter: any) {
    "use server"
    const now = new Date()

    const whereClause: any = {
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

    if (filter.taxonomy) {
        whereClause.taxonomy = filter.taxonomy.toUpperCase() // Ensure taxonomy matches the enum
    } else if (filter.date) {
        const date = new Date(filter.date)
        whereClause.OR = [
            {
                startDate: {
                    lte: date
                },
                endDate: {
                    gte: date
                }
            },
            {
                startDate: null,
                endDate: null
            }
        ]
    }

    const attractions = await prisma.attraction.findMany({
        where: whereClause
    })

    console.log("Attractions:", attractions)

    return attractions
}
