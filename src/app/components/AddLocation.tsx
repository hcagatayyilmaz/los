"use client"
import React, {useState} from "react"
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api"
import {MuseoModerno} from "next/font/google"
import {CoinIcon} from "@/app/lib/CustomIcons"
import Select from "react-select"
import {addLocation} from "@/app/server" // Adjust the import path as necessary
import mapStyle from "../lib/style"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

const options = [
    {value: "ATTRACTION", label: "Attraction"},
    {value: "EVENT", label: "Event"},
    {value: "EXPERIENCE", label: "Experience"}
]

const AddLocation: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(
        null
    )
    const [description, setDescription] = useState("")
    const [taxonomy, setTaxonomy] = useState<"ATTRACTION" | "EVENT" | "EXPERIENCE">("ATTRACTION")
    const [message, setMessage] = useState<string | null>(null)

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            setSelectedLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)
        if (!selectedLocation || !description) {
            setMessage("Please describe the place and select its location on the map.")
            return
        }
        try {
            const res = await addLocation({
                description,
                taxonomy,
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng
            })
            setMessage(res.message)
        } catch (error: any) {
            setMessage(error.message)
            console.error("Error submitting location:", error)
        }
    }

    return (
        <>
            <div className='flex justify-between items-center mt-4'>
                <h1
                    className={`font-bold text-2xl ${museumModerno.className} break-words whitespace-normal`}
                >
                    Add Location
                </h1>
                <span className='inline-block'>
                    <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                        <CoinIcon className='w-4 h-4 text-white' />
                        <span className='mt-1 ml-1 text-xs text-white'>+ {80}</span>
                    </div>
                </span>
            </div>
            <form
                onSubmit={handleSubmit}
                className='w-full max-w-md bg-white rounded-xl flex flex-col mt-6'
            >
                <div className='mb-4'>
                    <label
                        className={`block text-md font-medium text-black ${museumModerno.className}`}
                    >
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='mb-2'>
                    <label
                        className={`block text-md font-medium text-black ${museumModerno.className} mb-1`}
                    >
                        Type
                    </label>
                    <Select
                        value={options.find((option) => option.value === taxonomy)}
                        onChange={(option) =>
                            setTaxonomy(option?.value as "ATTRACTION" | "EVENT" | "EXPERIENCE")
                        }
                        options={options}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: "white",
                                borderColor: "#d1d5db", // Tailwind's gray-300
                                boxShadow: "none",
                                zIndex: 1000, // Ensure dropdown is above the map
                                "&:hover": {
                                    borderColor: "#6b7280" // Tailwind's gray-500
                                }
                            }),
                            menu: (provided) => ({
                                ...provided,
                                zIndex: 1000 // Ensure dropdown menu is above the map
                            })
                        }}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Location</label>
                    <LoadScript
                        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                    >
                        <GoogleMap
                            mapContainerStyle={{height: "300px", width: "100%", zIndex: 0}}
                            center={{lat: 48.519446747786135, lng: 9.057645}}
                            zoom={13}
                            options={{styles: mapStyle, disableDefaultUI: true}}
                            onClick={handleMapClick}
                        >
                            {selectedLocation && (
                                <Marker
                                    position={selectedLocation}
                                    icon={{
                                        url:
                                            "data:image/svg+xml;charset=utf-8," +
                                            encodeURIComponent(`
                                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" fill="#FF1493" stroke="white" stroke-width="4"/>
                                                <circle cx="12" cy="12" r="6" fill="#FF1493" fill-opacity="0.75"/>
                                            </svg>
                                        `),
                                        scaledSize: new google.maps.Size(24, 24),
                                        anchor: new google.maps.Point(12, 12)
                                    }}
                                />
                            )}
                        </GoogleMap>
                    </LoadScript>
                    {selectedLocation && (
                        <div className='mt-2 text-sm text-black font-bold text-center'>
                            Location <br />
                            {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                        </div>
                    )}
                </div>
                {message && (
                    <div className='mb-2 text-center text-sm text-customYellow'>{message}</div>
                )}
                <button
                    type='submit'
                    className='bg-customYellow text-white py-2 px-4 rounded-xl hover:bg-black transition duration-200'
                >
                    Submit
                </button>
            </form>
        </>
    )
}

export default AddLocation
