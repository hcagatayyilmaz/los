"use client"
import React, {useState} from "react"
import {foundHideAndSeek} from "../server"
import MapWithRadius from "./MapWithRadius"
import {useUserLocation} from "../providers/useUserLocation"
import {MuseoModerno} from "next/font/google"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

type HideAndSeekProps = {
    quest: any | null
}

const HideAndSeek: React.FC<HideAndSeekProps> = ({quest}) => {
    console.log("Quest:", quest)
    const [message, setMessage] = useState<string | null>(null)
    const {userLocation} = useUserLocation()

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
        return <p>Loading...</p>
    }

    return (
        <div className='max-w-lg mx-auto'>
            <section className='mb-6'>
                <div className='p-4 rounded-lg bg-pink-100'>
                    <h2 className={`text-lg font-semibold px-2 ${museumModerno.className} `}>
                        Hint
                    </h2>
                    <p className='text-gray-800 text-sm px-2'>{quest.meta.description.en}</p>
                    <div className='my-4'>
                        <MapWithRadius
                            latitude={quest.attraction.latitude}
                            longitude={quest.attraction.longitude}
                        />
                    </div>
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
    )
}

export default HideAndSeek
