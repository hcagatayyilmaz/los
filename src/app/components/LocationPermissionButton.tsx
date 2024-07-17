"use client"
import React, {useState} from "react"
import {useUserLocation} from "../providers/useUserLocation"
import {FaMapMarkerAlt} from "react-icons/fa"
import toast from "react-hot-toast"

const LocationPermissionButton: React.FC = () => {
    const {setUserLocation} = useUserLocation()
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
            className='bg-white p-2 rounded-full shadow-md cursor-pointer border-2 border-customYellow'
        >
            <FaMapMarkerAlt className='text-black text-2xl' />
        </div>
    )
}

export default LocationPermissionButton
