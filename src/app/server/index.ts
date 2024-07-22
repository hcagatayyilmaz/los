"use server"

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {PrismaClient} from "@prisma/client"
import {calculateDistance, calculateDistance2, calculateDistance3} from "@/app/lib/utils"

const prisma = new PrismaClient()

export async function checkIn({
    placeId,
    userLat,
    userLng
}: {
    placeId: string
    userLat: number
    userLng: number
}) {
    "use server"

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        throw new Error("User not authenticated")
    }

    const place = await prisma.attraction.findUnique({
        where: {id: placeId}
    })

    if (!place) {
        throw new Error("Place not found")
    }

    const distance = await calculateDistance3(userLat, userLng, place.latitude, place.longitude)
    if (distance <= 25) {
        // 25 meters threshold
        const checkIn = await prisma.checkIn.create({
            data: {
                userId: user.id,
                attractionId: placeId
            }
        })

        await prisma.user.update({
            where: {id: user.id},
            data: {points: {increment: place.points}}
        })

        await prisma.transaction.create({
            data: {
                userId: user.id,
                points: place.points,
                details: `checkin_id:${checkIn.id}`,
                type: "EARN_POINTS"
            }
        })

        return {success: true, message: "Checked in successfully", points: place.points}
    } else {
        return {success: false, message: "You are too far from the place to check in"}
    }
}

export async function obtainBadge({badgeId}: {badgeId: string}) {
    "use server"

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        throw new Error("User not authenticated")
    }

    const badge = await prisma.badge.findUnique({
        where: {id: badgeId},
        include: {users: true}
    })

    if (!badge) {
        throw new Error("Badge not found")
    }

    // Check if the user already has the badge
    const userHasBadge = await prisma.userBadge.findUnique({
        where: {
            userId_badgeId: {
                userId: user.id,
                badgeId: badgeId
            }
        }
    })

    if (userHasBadge) {
        throw new Error("User already has this badge")
    }

    // Verify if the user has checked into any of the attractions
    let obtained = false
    for (const attractionId of badge.attractionIds) {
        const checkIn = await prisma.checkIn.findFirst({
            where: {
                userId: user.id,
                attractionId: attractionId
            }
        })

        if (checkIn) {
            obtained = true
            break
        }
    }

    if (!obtained) {
        throw new Error("User has not checked into any required attractions")
    }

    // Add badge to user
    const userBadge = await prisma.userBadge.create({
        data: {
            userId: user.id,
            badgeId: badgeId
        }
    })

    // Add points to user
    await prisma.user.update({
        where: {id: user.id},
        data: {points: {increment: badge.points}}
    })

    await prisma.transaction.create({
        data: {
            userId: user.id,
            points: badge.points,
            details: `badge_id:${userBadge.id}`,
            type: "EARN_POINTS"
        }
    })

    return {message: "Badge obtained successfully!"}
}

export async function foundHideAndSeek({
    hideAndSeekId,
    userLat,
    userLng
}: {
    hideAndSeekId: string
    userLat: number
    userLng: number
}) {
    "use server"

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        console.error("User not authenticated")
        throw new Error("User not authenticated")
    }

    const hideAndSeek = await prisma.hideAndSeek.findUnique({
        where: {id: hideAndSeekId},
        include: {attraction: true}
    })

    if (!hideAndSeek) {
        console.error("HideAndSeek not found for ID:", hideAndSeekId)
        throw new Error("HideAndSeek not found")
    }

    const distance = await calculateDistance3(
        userLat,
        userLng,
        hideAndSeek.attraction.latitude,
        hideAndSeek.attraction.longitude
    )

    if (distance <= 20) {
        const userHideAndSeek = await prisma.userHideAndSeek.create({
            data: {
                userId: user.id,
                hideAndSeekId: hideAndSeek.id
            }
        })

        await prisma.user.update({
            where: {id: user.id},
            data: {points: {increment: hideAndSeek.points}}
        })

        await prisma.transaction.create({
            data: {
                userId: user.id,
                points: hideAndSeek.points,
                details: `hide_and_seek_id:${userHideAndSeek.id}`,
                type: "EARN_POINTS"
            }
        })

        return {message: "Congratulations! You've found the location and earned points!"}
    } else {
        return {message: `You are ${distance} meters away from the correct location.`}
    }
}

export async function submitQuiz({
    quizId,
    submitted_answer
}: {
    quizId: string
    submitted_answer: string
}) {
    "use server"
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        throw new Error("User not authenticated")
    }
    const quiz = await prisma.quiz.findUnique({
        where: {id: quizId}
    })
    if (!quiz) {
        throw new Error("Quiz not found")
    }

    // Check if the user has already submitted an answer for this quiz
    const previousAnswer = await prisma.userQuiz.findUnique({
        where: {
            userId_quizId: {
                userId: user.id,
                quizId: quiz.id
            }
        }
    })

    if (previousAnswer) {
        throw new Error("You have already submitted an answer for this quiz")
    }

    const userQuiz = await prisma.userQuiz.create({
        data: {
            userId: user.id,
            quizId: quiz.id,
            submitted_answer: submitted_answer
        }
    })

    if (submitted_answer !== quiz.answer) {
        return {message: "Incorrect answer!"}
    } else {
        await prisma.user.update({
            where: {id: user.id},
            data: {points: {increment: quiz.points}}
        })

        await prisma.transaction.create({
            data: {
                userId: user.id,
                points: quiz.points,
                details: `quiz_id:${userQuiz.id}`,
                type: "EARN_POINTS"
            }
        })

        return {message: "Correct answer! Points earned!"}
    }
}

export async function checkReward({rewardId}: {rewardId: string}) {
    "use server"
    const reward = await prisma.reward.findUnique({
        where: {id: rewardId}
    })

    if (!reward) {
        throw new Error("Reward not found")
    }

    return reward
}

export async function redeemReward(rewardId: string) {
    "use server"
    const {getUser} = getKindeServerSession()
    const kindeUser = await getUser()
    const user = kindeUser ? await prisma.user.findUnique({where: {id: kindeUser.id}}) : null
    console.log("Reward ID:", rewardId)
    if (!user) {
        throw new Error("Please login to redeem rewards")
    }

    const reward = await prisma.reward.findUnique({
        where: {id: rewardId}
    })

    if (!reward) {
        throw new Error("Reward not found")
    }

    if (user.points < reward.points) {
        throw new Error("Insufficient points")
    }

    await prisma.user.update({
        where: {id: user.id},
        data: {points: {decrement: reward.points}}
    })

    await prisma.transaction.create({
        data: {
            userId: user.id,
            points: -reward.points,
            details: `reward_id:${reward.id}`,
            type: "SPEND_POINTS"
        }
    })

    await prisma.userReward.create({
        data: {
            userId: user.id,
            rewardId: reward.id
        }
    })

    await prisma.reward.update({
        where: {id: reward.id},
        data: {available: false}
    })

    return {success: true, message: "Reward redeemed successfully!"}
}
