"use client"

import React from "react"
import {FaCrosshairs} from "react-icons/fa"
import {Location} from "../lib/types"
import useClosestLocation from "../providers/useClosestLocation"

type ClosestPlaceProps = {
  location: Location
}

const ClosestPlace: React.FC<ClosestPlaceProps> = ({location}) => {
  const closestDistance = useClosestLocation(location)

  return (
    <div
      className={`flex items-center px-1 rounded-full border-2 ${
        closestDistance !== null && closestDistance < 30
          ? "bg-neonGreen text-black px-3 border-black "
          : "bg-white border-customYellow"
      }`}
    >
      {closestDistance !== null && closestDistance >= 30 && (
        <FaCrosshairs className='text-md' />
      )}
      <span
        className={`${
          closestDistance !== null && closestDistance >= 30 ? "ml-1" : ""
        } text-xs`}
      >
        {closestDistance !== null
          ? closestDistance < 30
            ? "Reached"
            : `${closestDistance}m`
          : "No location"}
      </span>
    </div>
  )
}

export default ClosestPlace
