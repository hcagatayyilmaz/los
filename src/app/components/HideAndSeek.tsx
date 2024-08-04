"use client"
import React, {useState} from "react"
import {foundHideAndSeek} from "../server"
import MapWithRadius from "./MapWithRadius"
import {useUserLocation} from "../providers/useUserLocation"
import {MuseoModerno} from "next/font/google"
import {CoinIcon} from "../lib/CustomIcons"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

type HideAndSeekProps = {
    quest: any | null
}

const HideAndSeek: React.FC<HideAndSeekProps> = ({quest}) => {
    const [message, setMessage] = useState<string | null>(null)
    const {userLocation} = useUserLocation()
    const [isMapVisible, setIsMapVisible] = useState(false) // State for map visibility

    const handleHideAndSeek = async () => {
        if (!userLocation) {
            alert("Unable to get your location.")
            return
        }

        try {
            const response = await foundHideAndSeek({
                hideAndSeekId: quest.id,
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

    if (!quest) {
        return null
    }

    return (
        <>
            <div className='px-6 mt-6'>
                <div className='flex justify-between items-center mt-4'>
                    <h1
                        className={`font-bold text-xl ${museumModerno.className} break-words whitespace-normal`}
                    >
                        Weekly Hide & Seek
                    </h1>
                    <span className='inline-block'>
                        <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                            <CoinIcon className='w-4 h-4 text-white' />
                            <span className='mt-1 ml-1 text-xs text-white'>+ {125}</span>
                        </div>
                    </span>
                </div>
                <p className={`mt-2 mb-3 text-sm ${museumModerno.className}`}>
                    Go and find what is hidden for this week. In 20 meters radius. Follow the hint!
                </p>
            </div>
            <div className='w-full mx-auto'>
                <section className='mb-6'>
                    <div className='p-4 rounded-lg bg-pink-100'>
                        <h2 className={`text-lg font-semibold px-2 ${museumModerno.className} `}>
                            Hint
                        </h2>
                        <p className='text-gray-800 text-sm px-2'>{quest.description_en}</p>
                        <button
                            className={`text-customYellow py-2 px-2 rounded-xl transition duration-200 w-full  ${museumModerno.className}`}
                            onClick={() => setIsMapVisible(!isMapVisible)}
                        >
                            Show Hint on Map
                        </button>
                        {isMapVisible && (
                            <div className='my-4'>
                                <MapWithRadius
                                    latitude={quest.attraction.latitude}
                                    longitude={quest.attraction.longitude}
                                />
                            </div>
                        )}
                        <button
                            className='bg-customYellow text-white py-2 px-4 rounded-xl hover:bg-black transition duration-200 w-full'
                            onClick={handleHideAndSeek}
                        >
                            I Found
                        </button>
                        {message && <p className='text-customYellow mt-4 text-center'>{message}</p>}
                    </div>
                </section>
            </div>
        </>
    )
}

export default HideAndSeek
