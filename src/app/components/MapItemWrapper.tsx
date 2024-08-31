"use client"
import React from "react"
import {useSelectedItem} from "@/app/providers/useSelectedItem"
import ItemCard from "@/app/components/ItemCard"

const MapItemWrapper: React.FC = () => {
  const {selectedLocation} = useSelectedItem()

  if (!selectedLocation) {
    return null
  }

  return <ItemCard location={selectedLocation} />
}

export default MapItemWrapper
