import {useEffect, useState, useMemo} from "react"
import {Location} from "../lib/types"

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
    const distance = calculateDistance3(
      userLat,
      userLng,
      location.latitude,
      location.longitude
    )
    if (distance < closestDistance) {
      closestDistance = distance
    }
  })
  return closestDistance
}

export function useClosestPlace(
  locations: Location[],
  userLocation: {lat: number; lng: number} | null
): number | null {
  const [closestDistance, setClosestDistance] = useState<number | null>(null)

  useEffect(() => {
    if (userLocation && locations.length > 0) {
      const intervalId = setInterval(() => {
        const distance = findClosestLocation(
          userLocation.lat,
          userLocation.lng,
          locations
        )
        setClosestDistance(distance)
      }, 5000) // Adjust the interval as needed

      // Cleanup interval on component unmount
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [userLocation, locations])

  return closestDistance
}

// Equirectangular approximation
export function calculateDistance4(
  userLat: number,
  userLng: number,
  placeLat: number,
  placeLng: number
): number {
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180

  const R = 6371e3 // Earth's radius in meters

  const φ1 = toRadians(userLat)
  const φ2 = toRadians(placeLat)
  const Δλ = toRadians(placeLng - userLng)

  const x = Δλ * Math.cos((φ1 + φ2) / 2)
  const y = φ2 - φ1

  const distance = Math.sqrt(x * x + y * y) * R

  return Math.round(distance)
}

// interface RandomizedPoints {
//   [locationId: string]: number
// }

// export const getRandomizedPoints = (
//   min: number = 0,
//   max: number = 100
// ): number => {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

// export const getUserLocationPoints = (locationId: string): number => {
//   if (typeof window === "undefined") return 0

//   const storedPoints = localStorage.getItem("userLocationPoints")
//   const pointsMap: RandomizedPoints = storedPoints
//     ? JSON.parse(storedPoints)
//     : {}

//   if (!pointsMap[locationId]) {
//     pointsMap[locationId] = getRandomizedPoints()
//     localStorage.setItem("userLocationPoints", JSON.stringify(pointsMap))
//   }

//   return pointsMap[locationId]
// }
