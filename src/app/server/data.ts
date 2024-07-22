"use server"
import {KindeUser} from "@kinde-oss/kinde-auth-nextjs/types"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function getAllRewards() {
    const rewards = await prisma.reward.findMany({
        where: {
            available: true
        }
    })
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
        whereClause.taxonomy = filter.taxonomy.toUpperCase()
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

export async function getDBUser(userId: string) {
    "use server"
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return user
}

export async function getMyRewards(id: string) {
    const myRewards = await prisma.userReward.findMany({
        where: {
            userId: id
        },
        include: {
            reward: true
        }
    })
    return myRewards
}

export async function getPopQuiz() {
    const quiz = await prisma.quiz.findMany()

    return quiz
}
