"use client"
import React, {useState, useEffect} from "react"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import {useUserLocation} from "../providers/useUserLocation"
import {useRouter} from "next/navigation"
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs"
import {IoIosCloseCircleOutline} from "react-icons/io"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function Banner() {
    const {isAuthenticated} = useKindeBrowserClient()
    const {userLocation, requestLocationPermission} = useUserLocation()
    const [showBanner, setShowBanner] = useState(false)
    const [hasChecked, setHasChecked] = useState(false) // State to check if the conditions were met initially
    const router = useRouter()

    useEffect(() => {
        if (!hasChecked) {
            // userLocation is treated as a boolean
            if (!isAuthenticated || !userLocation) {
                setShowBanner(true)
            }
            setHasChecked(true) // Set the flag to true after the initial check
        }
    }, [isAuthenticated, userLocation, hasChecked])

    const handleLocationPermission = async () => {
        try {
            await requestLocationPermission()
        } catch (error) {
            console.error("Error requesting location permission:", error)
        }
    }

    if (!showBanner) return null

    return (
        <div className='relative mt-2 w-full bg-customYellow text-white p-4 flex flex-col items-center md:flex-row md:justify-between'>
            <div className='flex justify-between w-full mb-2 mt-1 md:mb-0'>
                <span className='text-sm text-center w-full'>
                    Please login and enable location permissions.
                    {/* { We don't store your location. To
                    learn more <Link href={"privacy"}> please read our privacy policy.</Link>} */}
                </span>
                <button
                    className='absolute top-1 right-1 text-white ml-4'
                    onClick={() => setShowBanner(false)}
                >
                    <IoIosCloseCircleOutline className='text-white text-xl' />
                </button>
            </div>
            <div className='flex gap-2'>
                {!isAuthenticated && (
                    <div
                        className={`bg-white rounded-xl px-2 py-1 text-xs text-black ${museoModerno.className}`}
                    >
                        <LoginLink>Login</LoginLink>
                    </div>
                )}
                {!userLocation && (
                    <button
                        className={`bg-white rounded-xl px-2 py-1 text-xs text-black ${museoModerno.className}`}
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
