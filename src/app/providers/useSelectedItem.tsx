"use client"
import {createContext, useContext, useState, ReactNode} from "react"
import {Location} from "../lib/types"
import {getPlaceDetails} from "../server/data"

type SelectedItemContextType = {
  selectedLocation: Location | null
  setSelectedLocation: (location: Location | null) => void
  updateSelectedLocation: (location: Location) => void
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

  const updateSelectedLocation = (location: Location) => {
    setSelectedLocation(location)
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
