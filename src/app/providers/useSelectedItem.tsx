"use client"
import {createContext, useContext, useState, ReactNode} from "react"
import {Location} from "../lib/types"
import {getPlaceDetails} from "../server/data"

type SelectedItemContextType = {
  selectedLocation: Location | null
  setSelectedLocation: (location: Location | null) => void
  updateSelectedLocation: (id: string | null) => void
}

const SelectedItemContext = createContext<SelectedItemContextType | undefined>(
  undefined
)

export const SelectedItemProvider = ({
  children,
  initialLocation
}: {
  children: ReactNode
  initialLocation: Location | null
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    initialLocation
  )

  // Function to fetch details by ID and update the selected location
  const updateSelectedLocation = async (id: string | null) => {
    if (!id) return
    try {
      const locationData = await getPlaceDetails(id)
      if (locationData) {
        setSelectedLocation(locationData)
      } else {
        console.error("Location not found")
      }
    } catch (error) {
      console.error("Failed to fetch location details", error)
    }
  }

  return (
    <SelectedItemContext.Provider
      value={{selectedLocation, setSelectedLocation, updateSelectedLocation}}
    >
      {children}
    </SelectedItemContext.Provider>
  )
}

export const useSelectedItem = () => {
  const context = useContext(SelectedItemContext)
  if (context === undefined) {
    throw new Error(
      "useSelectedItem must be used within a SelectedItemProvider"
    )
  }
  return context
}
