import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"

export function getCityPlaces({city}: {city: string}) {
    "use server"
}

export async function checkIn({placeId}: {placeId: string}) {
    "use server"

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        throw new Error("User not authenticated")
    }
}
