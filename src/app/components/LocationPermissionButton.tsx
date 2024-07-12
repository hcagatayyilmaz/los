"use client"
import React from "react"
import {useLocation} from "../providers/useUserLocation"

const LocationPermissionButton: React.FC = () => {
    const {setUserLocation} = useLocation()

    const requestLocationPermission = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    console.error("Error getting location permission:", error)
                }
            )
        } else {
            console.error("Geolocation is not supported by this browser.")
        }
    }

    return (
        <button
            onClick={requestLocationPermission}
            className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded'
        >
            Allow Location Access
        </button>
    )
}

export default LocationPermissionButton
