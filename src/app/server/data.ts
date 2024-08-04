"use server"
import {KindeUser} from "@kinde-oss/kinde-auth-nextjs/types"
import {PrismaClient} from "@prisma/client"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"

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

    const {getUser} = await getKindeServerSession()
    const user = await getUser()
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

    let attractions = await prisma.attraction.findMany({
        where: whereClause
    })

    if (user) {
        // Fetch all check-ins for the current user
        const checkIns = await prisma.checkIn.findMany({
            where: {
                userId: user.id,
                attractionId: {in: attractions.map((attr) => attr.id)}
            },
            select: {attractionId: true}
        })

        const checkedInAttractionIds = new Set(checkIns.map((checkIn) => checkIn.attractionId))

        // Add checkedIn flag to each attraction
        attractions = attractions.map((attraction) => ({
            ...attraction,
            checkedIn: checkedInAttractionIds.has(attraction.id)
        }))
    } else {
        // If no user, set checkedIn to false for all attractions
        attractions = attractions.map((attraction) => ({
            ...attraction,
            checkedIn: false
        }))
    }

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
    const currentDate = new Date()

    const quiz = await prisma.quiz.findFirst({
        where: {
            AND: [
                {
                    endDate: {
                        gt: currentDate
                    }
                },
                {
                    active: true
                }
            ]
        }
    })

    return quiz
}

export async function getHideAndSeek() {
    const currentDate = new Date()

    const hideAndSeek = await prisma.hideAndSeek.findFirst({
        where: {
            AND: [
                {
                    endDate: {
                        gt: currentDate
                    }
                },
                {
                    active: true
                }
            ]
        },
        include: {
            attraction: true
        }
    })
    return hideAndSeek
}

export async function getBadge() {
    try {
        const badges = await prisma.badge.findFirst({
            where: {
                isActive: true
            },
            include: {
                attractions: {
                    include: {
                        attraction: true // Include attraction details, but no check-ins or user-based data
                    }
                }
            }
        })

        return badges
    } catch (error) {
        console.error("Error fetching active badges:", error)
        throw new Error("Could not fetch active badges")
    }
}

export async function getBadgeStatus(attractionIds: string[]) {
    const {getUser} = await getKindeServerSession()
    const user = await getUser()

    if (!user) {
        throw new Error("User not authenticated")
    }

    const checkedIn = await prisma.checkIn.findMany({
        where: {
            userId: user.id,
            attractionId: {
                in: attractionIds
            }
        },
        select: {
            attractionId: true
        }
    })

    return checkedIn.map((checkIn) => checkIn.attractionId)
}

export async function getRewardsById(rewardId: string) {
    "use server"
    const reward = await prisma.reward.findUnique({
        where: {
            id: rewardId
        }
    })

    return reward
}
