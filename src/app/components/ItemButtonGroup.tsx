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
        <div className='w-full'>
            <button
                className='w-full border-2 border-customYellow text-customYellow rounded-2xl py-1'
                onClick={handleCheckIn}
            >
                Check In{" "}
                <span className='inline-block'>
                    <div className='flex items-center justify-center bg-customYellow rounded-md px-2 py-1'>
                        <CoinIcon className='w-4 h-4 text-white' />{" "}
                        <span className='mt-1 text-xs text-white '>30</span>
                    </div>
                </span>
            </button>
        </div>
    )
}

export default ItemButtonGroup
