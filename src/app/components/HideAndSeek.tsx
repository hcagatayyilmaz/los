import React from "react"
import {Location} from "../lib/types"
import {foundHideAndSeek} from "../server"
import MapWithRadius from "./MapWithRadius"

const hideAndSeekLocation: Location = {
    id: "1",
    lat: 48.52605,
    lng: 9.05584,
    name: "Tübingen Paleontology Museum",
    points: 100,
    description: "Find the dinosaur in Tübingen!",
    type: 1
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
        <div className='bg-yellow-200 p-4 rounded-md'>
            <h1 className='text-lg font-bold'>Find Secret Location</h1>
            <div className='bg-yellow-100 p-4 rounded-md'>
                <p className='text-blue-800'>
                    Find the dinosaur in Tübingen and get points! Click &quot;I Found&quot; when you
                    are at the correct location.
                </p>
                <MapWithRadius location={hideAndSeekLocation} />
                <button
                    className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200'
                    onClick={handleHideAndSeek}
                >
                    I Found
                </button>
                {message && <p className='text-green-600 mt-4'>{message}</p>}
            </div>
        </div>
    )
}

export default HideAndSeek
