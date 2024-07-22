"use client"

import React, {useEffect, useState} from "react"
import {FaCrosshairs} from "react-icons/fa"
import {useUserLocation} from "../providers/useUserLocation"
import {Location} from "../lib/types"
import {findClosestLocation} from "../lib/func"

type ClosestPlaceProps = {
    locations: Location[]
}

const ClosestPlace: React.FC<ClosestPlaceProps> = ({locations}) => {
    const {userLocation} = useUserLocation()
    const [closestDistance, setClosestDistance] = useState<number | null>(null)
    console.log(closestDistance)

    useEffect(() => {
        if (userLocation) {
            const distance = findClosestLocation(userLocation.lat, userLocation.lng, locations)
            setClosestDistance(distance)
        }
    }, [userLocation, locations])

    return (
        <div className='flex items-center px-1 bg-white rounded-full border-2 border-customYellow'>
            <FaCrosshairs className='text-md' />
            <span className='ml-1 text-xs'>
                {closestDistance !== null ? `${closestDistance}m` : "?"}
            </span>
        </div>
    )
}

export default ClosestPlace
