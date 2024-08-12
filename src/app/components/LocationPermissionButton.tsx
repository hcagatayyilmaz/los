"use client"
import React, {useState} from "react"
import {useUserLocation} from "../providers/useUserLocation"
import {MdGpsFixed} from "react-icons/md"

import toast from "react-hot-toast"

const LocationPermissionButton: React.FC = () => {
    const {setUserLocation, userLocation} = useUserLocation()
    const [toastShown, setToastShown] = useState(false)

    const requestLocationPermission = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    if (!toastShown) {
                        toast.success("Location permission granted!")
                        setToastShown(true)
                    }
                },
                (error) => {
                    console.error("Error getting location permission:", error)
                    if (error.code === 1) {
                        toast.error("User denied geolocation permission.")
                    } else {
                        toast.error("Error getting location. Please try again.")
                    }
                }
            )
        } else {
            toast.error("Geolocation is not supported by this browser.")
        }
    }

    return (
        <div
            onClick={requestLocationPermission}
            className='flex justify-center  items-center gap-2 bg-white p-[6px] rounded-full shadow-md cursor-pointer border-2 border-customYellow'
        >
            <MdGpsFixed className='text-black text-2xl' />
            {userLocation ? "" : <span className='text-xs'>Enable location</span>}
        </div>
    )
}

export default LocationPermissionButton
