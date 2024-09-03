"use client"
import React from "react"
import {useSelectedItem} from "@/app/providers/useSelectedItem"
import ItemCard from "@/app/components/ItemCard"
import {useUIContext} from "@/app/providers/UIProvider"

const MapItemWrapper: React.FC = () => {
  const {selectedLocation} = useSelectedItem()
  const {isListView} = useUIContext()

  if (!selectedLocation || isListView) {
    return null
  }

  return <ItemCard location={selectedLocation} />
}

export default MapItemWrapper
