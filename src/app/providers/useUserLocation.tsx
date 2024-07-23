"use client"
import React, {createContext, useState, useEffect, useContext} from "react"

// Define the shape of the context
type LocationContextType = {
    userLocation: {lat: number; lng: number} | null
    setUserLocation: React.Dispatch<React.SetStateAction<{lat: number; lng: number} | null>>
    requestLocationPermission: () => Promise<void>
}

// Create the context with a default value
const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const UserLocationProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null)

    const requestLocationPermission = async () => {
        if (navigator.geolocation) {
            return new Promise<void>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        })
                        resolve()
                    },
                    (error) => {
                        console.error("Error getting location:", error)
                        reject(error)
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                )
            })
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }

    useEffect(() => {
        requestLocationPermission().catch(console.error)
    }, [])

    return (
        <LocationContext.Provider
            value={{userLocation, setUserLocation, requestLocationPermission}}
        >
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
