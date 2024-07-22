import {Location} from "../lib/types"

export async function calculateDistance(
    userLat: number,
    userLng: number,
    placeLat: number,
    placeLng: number
): Promise<number> {
    "use server"
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${userLat},${userLng}&destinations=${placeLat},${placeLng}&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.rows[0].elements[0].status === "OK") {
        return data.rows[0].elements[0].distance.value // distance in meters
    } else {
        throw new Error("Failed to calculate distance")
    }
}

export async function calculateDistance2(
    userLat: number,
    userLng: number,
    placeLat: number,
    placeLng: number
): Promise<number> {
    const apiKey = process.env.OPENROUTESERVICE_API_KEY // Set your OpenRouteService API key in environment variables

    if (!apiKey) {
        throw new Error("API key is not set")
    }

    const url = `https://api.openrouteservice.org/v2/matrix/driving-car`

    const body = {
        locations: [
            [userLng, userLat],
            [placeLng, placeLat]
        ],
        metrics: ["distance"],
        units: "m"
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()

    if (data.distances && data.distances[0][1]) {
        return data.distances[0][1] // distance in meters
    } else {
        throw new Error("Failed to calculate distance")
    }
}

export function calculateDistance3(
    userLat: number,
    userLng: number,
    placeLat: number,
    placeLng: number
): number {
    const toRadians = (degrees: number): number => (degrees * Math.PI) / 180

    const R = 6371e3 // Earth's radius in meters

    const φ1 = toRadians(userLat)
    const φ2 = toRadians(placeLat)
    const Δφ = toRadians(placeLat - userLat)
    const Δλ = toRadians(placeLng - userLng)

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = R * c // distance in meters

    return Math.round(distance)
}

export function findClosestLocation(
    userLat: number,
    userLng: number,
    locations: Location[]
): number {
    if (locations.length === 0) return 0

    let closestDistance = Infinity

    locations.forEach((location) => {
        const distance = calculateDistance3(userLat, userLng, location.latitude, location.longitude)
        if (distance < closestDistance) {
            closestDistance = distance
        }
    })

    return closestDistance
}
