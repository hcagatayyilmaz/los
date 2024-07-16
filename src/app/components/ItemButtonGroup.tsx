"use client"
import React from "react"
import {Location} from "../lib/types"
import {CoinIcon} from "../lib/CustomIcons"
import {checkIn} from "../server/index"
import {useUserLocation} from "../providers/useUserLocation"
import toast from "react-hot-toast"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import CustomToast from "./CustomToast"

const ItemButtonGroup: React.FC<{location: Location}> = ({location}) => {
    const {userLocation} = useUserLocation()
    const {isAuthenticated} = useKindeBrowserClient()

    const handleCheckIn = async () => {
        if (!isAuthenticated) {
            toast.custom(
                (t) => <CustomToast message='You need to be logged in to check in.' type='error' />,
                {id: "auth-error"}
            )
            return
        }

        if (userLocation) {
            const {lat: userLat, lng: userLng} = userLocation

            try {
                const result = await checkIn({placeId: location.id, userLat, userLng})

                if (result.success) {
                    toast.custom(
                        (t) => (
                            <CustomToast
                                message={`Checked in successfully! You earned ${result.points} points.`}
                                type='success'
                            />
                        ),
                        {id: "checkin-success"}
                    )
                } else {
                    toast.custom((t) => <CustomToast message={result.message} type='error' />, {
                        id: "checkin-error"
                    })
                }
            } catch (error) {
                toast.custom(
                    (t) => (
                        <CustomToast message='An error occurred while checking in.' type='error' />
                    ),
                    {id: "checkin-error"}
                )
            }
        } else {
            toast.custom(
                (t) => <CustomToast message='Unable to get your current location.' type='error' />,
                {id: "location-error"}
            )
        }
    }

    return (
        <div className='flex items-center w-full'>
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
