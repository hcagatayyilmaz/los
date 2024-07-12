"use server"

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {PrismaClient} from "@prisma/client"
import {calculateDistance} from "@/app/lib/utils"

const prisma = new PrismaClient()

export async function getCityPlaces({city}: {city: string}) {
    "use server"
}

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
