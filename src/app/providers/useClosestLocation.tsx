import {useState, useEffect} from "react"
import {Location} from "../lib/types"
import {calculateDistance3, calculateDistance4} from "../lib/func"
import {useUserLocation} from "../providers/useUserLocation"

export default function useClosestLocation(location: Location): number | null {
  const {userLocation} = useUserLocation()
  const [closestDistance, setClosestDistance] = useState<number | null>(null)

  useEffect(() => {
    const findClosestLocation = () => {
      if (!userLocation) return null

      const distance = calculateDistance4(
        userLocation.lat,
        userLocation.lng,
        location.latitude,
        location.longitude
      )

      return distance
    }

    const updateClosestLocation = () => {
      const distance = findClosestLocation()

      setClosestDistance(distance)
    }

    updateClosestLocation() // Initial call to set the distance

    const intervalId = setInterval(updateClosestLocation, 5000) // Update every 5 seconds

    return () => clearInterval(intervalId) // Clean up interval on unmount
  }, [userLocation, location])

  return closestDistance
}
