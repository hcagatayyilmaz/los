"use client"
import React, {useState} from "react"
import {useUserLocation} from "../providers/useUserLocation"
import {MdGpsFixed} from "react-icons/md"
import toast from "react-hot-toast"
import CustomToast from "./CustomToast"

const LocationPermissionButton: React.FC = () => {
  const {userLocation, requestLocationPermission} = useUserLocation()
  const [toastShown, setToastShown] = useState(false)

  const handleClick = async () => {
    if (userLocation) {
      // If location is already enabled, trigger map centering
      window.dispatchEvent(new CustomEvent("centerMapToUserLocation"))
    } else {
      // If location is not enabled, request permission
      try {
        await requestLocationPermission()
        if (!toastShown) {
          toast.success("Location permission granted!")
          setToastShown(true)
        }
      } catch (error) {
        console.error("Error getting location permission:", error)
        toast.custom(
          <CustomToast

            message='Error getting location. Please try again or reach support@los.city'

            type='error'
          />,
          {position: "top-center", duration: 3000}
        )
      }
    }
  }

  return (
    <div
      onClick={handleClick}
      className='flex justify-center items-center gap-2 bg-white p-[6px] rounded-full shadow-md cursor-pointer border-2 border-customYellow'
    >
      <MdGpsFixed className='text-black text-2xl ' />
      {userLocation ? (
        "Center Map"
      ) : (
        <span className='text-xs'>Enable location</span>
      )}
    </div>
  )
}

export default LocationPermissionButton
