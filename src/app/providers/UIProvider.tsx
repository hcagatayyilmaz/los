"use client"
import React, {createContext, useState, useContext} from "react"

// Define the shape of the UI context
type UIContextType = {
    isListView: boolean
    setIsListView: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context with a default value
const UIContext = createContext<UIContextType | undefined>(undefined)

export const UIProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isListView, setIsListView] = useState(false) // Initialize isListView to false

    return <UIContext.Provider value={{isListView, setIsListView}}>{children}</UIContext.Provider>
}

// Custom hook to use the UI context
export const useUIContext = () => {
    const context = useContext(UIContext)
    if (context === undefined) {
        throw new Error("useUIContext must be used within a UIProvider")
    }
    return context
}
