"use client"
import React from "react"
import TotalPoints from "./TotalPoints"
import ClosestPlace from "./ClosestPlace"
import LocationPermissionButton from "./LocationPermissionButton"
import {useSelectedItem} from "../providers/useSelectedItem"
import {useUIContext} from "../providers/UIProvider"
import {Location} from "../lib/types"

type CardButtonWrapperProps = {
  points: number
  location: Location
}

function CardButtonWrapper({points, location}: CardButtonWrapperProps) {
  const {selectedLocation} = useSelectedItem()
  const {isListView} = useUIContext()

  if (isListView) return null

  return (
    <div className='flex mx-4 mb-2 justify-between items-center'>
      <TotalPoints points={points} />
      <div className='flex gap-1'>
        <ClosestPlace location={selectedLocation || location} />
        <LocationPermissionButton />
      </div>
    </div>
  )
}

export default CardButtonWrapper
