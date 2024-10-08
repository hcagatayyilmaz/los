"use client"
import React, {useState} from "react"
import {Location} from "../lib/types"
import {CoinIcon} from "../lib/CustomIcons"
import {checkIn, checkInSyntheticLocation} from "../server/index"
import {useUserLocation} from "../providers/useUserLocation"
import toast from "react-hot-toast"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import CustomToast from "./CustomToast"
import {FaLock} from "react-icons/fa"
import {ImUnlocked} from "react-icons/im"
import LoadingSpinner from "./LoadingSpinner"

const ItemButtonGroup: React.FC<{location: Location}> = ({location}) => {
  const {userLocation} = useUserLocation()
  const {isAuthenticated} = useKindeBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckIn = async () => {
    if (!isAuthenticated) {
      toast.custom(
        (t) => (
          <CustomToast
            message='You need to be logged in to check in.'
            type='error'
          />
        ),
        {id: "auth-error", position: "top-center", duration: 1000}
      )
      return
    }

    if (userLocation) {
      const {lat: userLat, lng: userLng} = userLocation

      setIsLoading(true)
      try {
        const result = location.isSynthetic
          ? await checkInSyntheticLocation({
              placeId: location.id,
              userLat,
              userLng
            })
          : await checkIn({placeId: location.id, userLat, userLng})

        if (result.success) {
          toast.custom(
            (t) => (
              <CustomToast
                message={`Checked in successfully! You earned ${
                  result.points || 0
                } points.`}
                type='success'
              />
            ),
            {id: "checkin-success", position: "top-center", duration: 1000}
          )
        } else {
          toast.custom(
            (t) => <CustomToast message={result.message} type='error' />,
            {
              id: "checkin-error",
              position: "top-center",
              duration: 1000
            }
          )
        }
      } catch (error) {
        toast.custom(
          (t) => (
            <CustomToast
              message='An error occurred while checking in.'
              type='error'
            />
          ),
          {
            id: "checkin-error",
            position: "top-center",
            duration: 1000
          }
        )
      } finally {
        setIsLoading(false)
      }
    } else {
      toast.custom(
        (t) => (
          <CustomToast
            message='Unable to get your current location.'
            type='error'
          />
        ),
        {id: "location-error", position: "top-center", duration: 1000}
      )
    }
  }

  return (
    <div className='w-full px-2'>
      {isLoading && <LoadingSpinner />}
      {location.checkedIn ? (
        <button
          className='w-full border-2 border-customYellow text-white bg-customYellow rounded-2xl py-1 flex items-center justify-center gap-2'
          onClick={handleCheckIn}
          disabled={isLoading}
        >
          <div className='flex items-center'>
            <ImUnlocked className='w-3 h-3 text-customYellow  mr-1' />
            Great! You are already checked in.
          </div>
        </button>
      ) : (
        <button
          className='w-full border-2 border-customYellow text-customYellow rounded-2xl py-1 flex items-center justify-center gap-2'
          onClick={handleCheckIn}
          disabled={isLoading}
        >
          <div className='flex items-center'>
            <FaLock className='w-3 h-3 text-customYellow  mr-1' />
            Check In!
          </div>
        </button>
      )}
    </div>
  )
}

export default ItemButtonGroup
