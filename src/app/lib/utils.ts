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
