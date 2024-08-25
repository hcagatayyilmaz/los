"use client"
import React, {useEffect, useState} from "react"
import {useSelectedItem} from "@/app/providers/useSelectedItem"
import ItemCard from "@/app/components/ItemCard"
import {Location} from "@/app/lib/types"

const SelectedItemCardWrapper: React.FC = () => {
  const {selectedLocation} = useSelectedItem()
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation)
    }
  }, [selectedLocation])

  if (!location) {
    return null // or return some placeholder
  }

  return <ItemCard location={location} />
}

export default SelectedItemCardWrapper
