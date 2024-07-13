"use client"

import React, {useState} from "react"
import {obtainBadge, foundHideAndSeek} from "@/app/server/index" // Adjust the import path as necessary
import {useUserLocation} from "@/app/providers/useUserLocation" // Adjust the import path as necessary

type QuestsPageParams = {
    params: {
        slug: string
    }
}

function QuestsPage({params}: QuestsPageParams) {
    const [message, setMessage] = useState<string | null>(null)
    const [showObtainBadge, setShowObtainBadge] = useState(false)
    const [showHideAndSeek, setShowHideAndSeek] = useState(false)
    const {userLocation} = useUserLocation()

    const handleObtainBadge = async () => {
        try {
            const response = await obtainBadge({badgeId: "clyk4su0c00004qxzqb064tl8"})
            alert(response.message)
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert("An unknown error occurred.")
            }
        }
    }

    const handleHideAndSeek = async () => {
        if (!userLocation) {
            alert("Unable to get your location.")
            return
        }

        try {
            const response = await foundHideAndSeek({
                hideAndSeekId: "clyk6c7m10001kcld3ozbeuda",
                userLat: userLocation.lat,
                userLng: userLocation.lng
            })
            setMessage(response.message)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message)
            } else {
                setMessage("An unknown error occurred.")
            }
        }
    }

    return (
        <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md font-serif'>
            <h1 className='text-3xl font-semibold mb-6 text-center'>Quests</h1>
            <hr className='border-gray-300 mb-6' />
            <div className='mb-6'>
                <h2
                    className='text-2xl font-semibold cursor-pointer flex justify-between items-center p-4 rounded-md hover:bg-gray-100 transition duration-300'
                    onClick={() => setShowObtainBadge(!showObtainBadge)}
                >
                    Obtain Badge {showObtainBadge ? "▲" : "▼"}
                </h2>
                {showObtainBadge && (
                    <div className='p-4 rounded-md mt-2'>
                        <p className='text-gray-700 mb-4'>
                            Coffee Addict - If you already checked in 3 cool kaffee places you can
                            obtain this rewards and get points!
                        </p>
                        <button
                            className='bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300'
                            onClick={handleObtainBadge}
                        >
                            Click here to obtain the badge
                        </button>
                    </div>
                )}
            </div>
            <hr className='border-gray-300 mb-6' />
            <div>
                <h2
                    className='text-2xl font-semibold cursor-pointer flex justify-between items-center p-4 rounded-md hover:bg-gray-100 transition duration-300'
                    onClick={() => setShowHideAndSeek(!showHideAndSeek)}
                >
                    Hide & Seek {showHideAndSeek ? "▲" : "▼"}
                </h2>
                {showHideAndSeek && (
                    <div className='p-4 rounded-md mt-2'>
                        <p className='text-gray-700 mb-4'>
                            Find the dinasour in Tübingen and get points! Click "I Found" when you
                            are at the correct location.
                        </p>
                        <button
                            className='bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300'
                            onClick={handleHideAndSeek}
                        >
                            I Found
                        </button>
                        {message && <p className='text-green-600 mt-4'>{message}</p>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default QuestsPage
