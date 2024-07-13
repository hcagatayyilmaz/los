"use server"

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {PrismaClient} from "@prisma/client"
import {calculateDistance} from "@/app/lib/utils"

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

    "Check In function"
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

    const distance = await calculateDistance(userLat, userLng, place.latitude, place.longitude)
    console.log("Distance:", distance)
    if (distance <= 20) {
        // 20 meters threshold
        await prisma.checkIn.create({
            data: {
                userId: user.id,
                attractionId: placeId
            }
        })

        await prisma.user.update({
            where: {id: user.id},
            data: {points: {increment: place.points}}
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
    await prisma.userBadge.create({
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

    console.log("Hide & Seek ID:", hideAndSeekId)

    // Log Prisma client to ensure it's initialized correctly
    console.log("Prisma Client:", prisma)

    const hideAndSeek = await prisma.hideAndSeek.findUnique({
        where: {id: hideAndSeekId},
        include: {attraction: true}
    })

    if (!hideAndSeek) {
        console.error("HideAndSeek not found for ID:", hideAndSeekId)
        throw new Error("HideAndSeek not found")
    }

    console.log("HideAndSeek Data:", hideAndSeek)

    // Calculate distance using Google Maps API or similar service
    const distance = await calculateDistance(
        userLat,
        userLng,
        hideAndSeek.attraction.latitude,
        hideAndSeek.attraction.longitude
    )

    if (distance <= 20) {
        await prisma.userHideAndSeek.create({
            data: {
                userId: user.id,
                hideAndSeekId: hideAndSeek.id
            }
        })

        await prisma.user.update({
            where: {id: user.id},
            data: {points: {increment: hideAndSeek.points}}
        })

        return {message: "Congratulations! You've found the location and earned points!"}
    } else {
        return {message: `You are ${distance} meters away from the correct location.`}
    }
}
