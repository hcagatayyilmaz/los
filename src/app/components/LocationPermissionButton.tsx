// src/app/components/LocationPermissionButton.tsx
"use client"
import React from "react"
import {useLocation} from "../providers/LocationProvider"

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
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
            Allow Location Access
        </button>
    )
}

export default LocationPermissionButton
