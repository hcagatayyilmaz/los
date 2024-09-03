"use client"
import React, {useState, useEffect} from "react"
import {useUserLocation} from "../providers/useUserLocation"
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs"
import {IoIosCloseCircleOutline} from "react-icons/io"
import {MuseoModerno} from "next/font/google"

const museoModerno = MuseoModerno({
  subsets: ["latin"]
})

function Banner() {
  const {userLocation, requestLocationPermission} = useUserLocation()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userLocation) {
        setShowBanner(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [userLocation])

  useEffect(() => {
    if (userLocation) {
      setShowBanner(false)
    }
  }, [userLocation])

  const handleLocationPermission = async () => {
    try {
      await requestLocationPermission()
    } catch (error) {
      console.error("Error requesting location permission:", error)
    }
  }

  if (!showBanner) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='relative w-full max-w-md bg-customYellow text-white p-4 rounded-xl shadow-lg'>
        <button
          className='absolute top-2 right-2 text-white'
          onClick={() => setShowBanner(false)}
        >
          <IoIosCloseCircleOutline className='text-white text-xl' />
        </button>
        <div className='text-center mb-4'>
          <span className='text-sm'>
            Please enable location permissions to use all features.
          </span>
        </div>
        <div className='flex justify-center gap-2'>
          <button
            className={`bg-white rounded-xl px-4 py-2 text-sm text-black ${museoModerno.className}`}
            onClick={handleLocationPermission}
          >
            Enable Location
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
