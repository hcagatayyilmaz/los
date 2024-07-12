"use client"
import React from "react"
import {Location} from "../lib/types"
import {CoinIcon} from "../lib/CustomIcons"
import {checkIn} from "../server/index"
import {useUserLocation} from "../providers/useUserLocation"

function ItemButtonGroup({location}: {location: Location}) {
    const {userLocation} = useUserLocation()

    const handleCheckIn = async () => {
        if (userLocation) {
            const {lat: userLat, lng: userLng} = userLocation

            const result = await checkIn({placeId: location.id, userLat, userLng})

            if (result.success) {
                alert(`Checked in successfully! You earned ${result.points} points.`)
            } else {
                alert(result.message)
            }
        } else {
            alert("Unable to get your current location.")
        }
    }

    return (
        <div className='flex items-center  w-full'>
            <div className='flex items-center justify-between bg-pink-100 text-pink-500 rounded-full px-4 py-2 mr-4'>
                <CoinIcon className='text-pink-500' />
                <span className='ml-2 text-sm'>{location.points}</span>
            </div>
            <button
                className='bg-green-500 text-white rounded-full px-4 py-2'
                onClick={handleCheckIn}
            >
                Check In
            </button>
        </div>
    )
}

export default ItemButtonGroup
