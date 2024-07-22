import React from "react"
import {Location} from "../lib/types"
import {foundHideAndSeek} from "../server"
import MapWithRadius from "./MapWithRadius"

const hideAndSeekLocation: Location = {
    id: "1",
    latitude: 48.52605,
    longitude: 9.05584,
    name: "Tübingen Paleontology Museum",
    points: 100,
    taxonomy: "ATTRACTION",
    imageUrl: null,
    meta: {
        title: {
            en: "Find the dinosaur in Tübingen!",
            de: "Finde den Dinosaurier in Tübingen!"
        },
        description: {
            en: "Search for the dinosaur hidden in the Tübingen Paleontology Museum.",
            de: "Suche nach dem Dinosaurier, der im Paläontologischen Museum Tübingen versteckt ist."
        }
    },
    isActive: true,
    endDate: null,
    startDate: null
}

type HideAndSeekProps = {
    userLocation: any | null
    setMessage: (message: string) => void
    message: string | null
}

const HideAndSeek: React.FC<HideAndSeekProps> = ({userLocation, setMessage, message}) => {
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
        <div className='max-w-lg mx-auto '>
            <section className='mb-6'>
                <div className='p-4 rounded-lg bg-pink-100'>
                    <h2 className='text-lg font-semibold px-2'>Hint</h2>
                    <p className='text-gray-800 text-sm px-2'>
                        Find the dinosaur in Tübingen and get points! Click &quot;I Found&quot; when
                        you are at the correct location.
                    </p>
                    <div className='my-4'>
                        <MapWithRadius location={hideAndSeekLocation} />
                    </div>
                    <button
                        className='bg-customYellow text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 w-full'
                        onClick={handleHideAndSeek}
                    >
                        I Found
                    </button>
                    {message && <p className='text-green-600 mt-4'>{message}</p>}
                </div>
            </section>
        </div>
    )
}

export default HideAndSeek
