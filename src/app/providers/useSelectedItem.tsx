"use client"
import {createContext, useContext, useState, ReactNode} from "react"
import {Location} from "../lib/types"

type SelectedItemContextType = {
  selectedLocation: Location | null
  setSelectedLocation: (location: Location | null) => void
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

  return (
    <SelectedItemContext.Provider
      value={{selectedLocation, setSelectedLocation}}
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
