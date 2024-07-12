"use client"
import {createContext, useContext, useState, ReactNode} from "react"
import {Location} from "../lib/types"

type LocationContextType = {
    selectedLocation: Location | null
    setSelectedLocation: (location: Location | null) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const LocationProvider = ({
    children,
    initialLocation
}: {
    children: ReactNode
    initialLocation: Location | null
}) => {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation)

    return (
        <LocationContext.Provider value={{selectedLocation, setSelectedLocation}}>
            {children}
        </LocationContext.Provider>
    )
}

export const useSelectedItem = () => {
    const context = useContext(LocationContext)
    if (context === undefined) {
        throw new Error("useSelectedItem must be used within a LocationProvider")
    }
    return context
}
