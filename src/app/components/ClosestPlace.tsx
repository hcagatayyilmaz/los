"use client"

import React from "react"
import {FaCrosshairs} from "react-icons/fa"
import {Location} from "../lib/types"
import useClosestLocation from "../providers/useClosestLocation"

type ClosestPlaceProps = {
    locations: Location[]
}

const ClosestPlace: React.FC<ClosestPlaceProps> = ({locations}) => {
    const closestDistance = useClosestLocation(locations)

    return (
        <div className='flex items-center px-1 bg-white rounded-full border-2 border-customYellow'>
            <FaCrosshairs className='text-md' />
            <span className='ml-1 text-xs'>
                {closestDistance !== null ? `${closestDistance}m` : "N/A"}
            </span>
        </div>
    )
}

export default ClosestPlace
