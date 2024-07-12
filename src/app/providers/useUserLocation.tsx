"use client"
import React, {createContext, useState, useEffect, useContext} from "react"

// Define the shape of the context
type LocationContextType = {
    userLocation: {lat: number; lng: number} | null
    setUserLocation: React.Dispatch<React.SetStateAction<{lat: number; lng: number} | null>>
}

// Create the context with a default value
const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const UserLocationProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    console.log("New position received:", position.coords)
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    console.error("Error getting location:", error)
                    if (error.code === 1) {
                        console.log("User denied geolocation permission")
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            )

            // Cleanup function to stop watching location when component unmounts
            return () => {
                navigator.geolocation.clearWatch(watchId)
            }
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }, [])

    return (
        <LocationContext.Provider value={{userLocation, setUserLocation}}>
            {children}
        </LocationContext.Provider>
    )
}

// Custom hook to use the location context
export const useUserLocation = () => {
    const context = useContext(LocationContext)
    if (context === undefined) {
        throw new Error("useUserLocation must be used within a UserLocationProvider")
    }
    return context
}
