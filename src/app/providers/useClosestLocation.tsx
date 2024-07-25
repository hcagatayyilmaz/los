import {useState, useEffect} from "react"
import {Location} from "../lib/types"
import {calculateDistance3} from "../lib/func"
import {useUserLocation} from "../providers/useUserLocation"

export default function useClosestLocation(locations: Location[]): number | null {
    const {userLocation} = useUserLocation()
    const [closestDistance, setClosestDistance] = useState<number | null>(null)

    useEffect(() => {
        const findClosestLocation = () => {
            if (!userLocation) return null

            let closestDistance = Infinity

            locations.forEach((location) => {
                const distance = calculateDistance3(
                    userLocation.lat,
                    userLocation.lng,
                    location.latitude,
                    location.longitude
                )
                if (distance < closestDistance) {
                    closestDistance = distance
                }
            })

            return closestDistance === Infinity ? null : closestDistance
        }

        const updateClosestLocation = () => {
            const distance = findClosestLocation()
            console.log(`Closest location updated: ${distance} meters`)
            setClosestDistance(distance)
        }

        updateClosestLocation() // Initial call to set the distance

        const intervalId = setInterval(updateClosestLocation, 5000) // Update every 5 seconds

        return () => clearInterval(intervalId) // Clean up interval on unmount
    }, [userLocation, locations])

    return closestDistance
}
