"use client"
import React from "react"
import TotalPoints from "./TotalPoints"
import ClosestPlace from "./ClosestPlace"
import LocationPermissionButton from "./LocationPermissionButton"
import {Location} from "../lib/types"
import {useUIContext} from "../providers/UIProvider"

type CardButtonWrapperProps = {
  points: number
  locations: Location[]
}

function CardButtonWrapper({points, locations}: CardButtonWrapperProps) {
  const {isListView} = useUIContext()

  if (isListView) return null

  return (
    <div className='flex mx-4 mb-1 justify-between items-center'>
      <TotalPoints points={points} />
      <div className='flex gap-1'>
        <ClosestPlace locations={locations} />
        <LocationPermissionButton />
      </div>
    </div>
  )
}

export default CardButtonWrapper
