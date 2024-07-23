"use client"
import React, {useState, useEffect} from "react"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import {useUserLocation} from "../providers/useUserLocation"
import {useRouter} from "next/navigation"
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs"

function Banner() {
    const {isAuthenticated} = useKindeBrowserClient()
    const {userLocation, requestLocationPermission} = useUserLocation()
    const [showBanner, setShowBanner] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated || !userLocation) {
            setShowBanner(true)
        } else {
            setShowBanner(false)
        }
    }, [isAuthenticated, userLocation])

    const handleLocationPermission = async () => {
        try {
            await requestLocationPermission()
        } catch (error) {
            console.error("Error requesting location permission:", error)
        }
    }

    if (!showBanner) return null

    return (
        <div className='fixed mt-2 w-full bg-customYellow text-white p-4 flex flex-col items-center md:flex-row md:justify-between'>
            <div className='flex justify-between w-full mb-2 md:mb-0'>
                <span className='text-sm'>Please sign up and enable location permissions.</span>
                <button className='text-white ml-4' onClick={() => setShowBanner(false)}>
                    X
                </button>
            </div>
            <div className='flex gap-2'>
                {!isAuthenticated && <LoginLink>Login</LoginLink>}
                {!userLocation && (
                    <button
                        className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleLocationPermission}
                    >
                        Enable Location
                    </button>
                )}
            </div>
        </div>
    )
}

export default Banner
