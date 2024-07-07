// src/app/providers/LocationProvider.tsx
"use client"
import React, {createContext, useState, useContext, ReactNode} from "react"

type Location = {
    lat: number
    lng: number
} | null

type LocationContextType = {
    userLocation: Location
    setUserLocation: React.Dispatch<React.SetStateAction<Location>>
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const LocationProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [userLocation, setUserLocation] = useState<Location>(null)

    return (
        <LocationContext.Provider value={{userLocation, setUserLocation}}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocation = () => {
    const context = useContext(LocationContext)
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider")
    }
    return context
}
