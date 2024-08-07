"use client"
import React, {useState} from "react"
import {GoogleMap, LoadScript, LoadScriptNext, OverlayView} from "@react-google-maps/api"
import {MuseoModerno} from "next/font/google"
import {CoinIcon} from "@/app/lib/CustomIcons"
import Select from "react-select"
import {addLocation} from "@/app/server" // Adjust the import path as necessary
import mapStyle from "../lib/style"
import {LiveLocationPin} from "./Pins"

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
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [taxonomy, setTaxonomy] = useState<"ATTRACTION" | "EVENT" | "EXPERIENCE">("ATTRACTION")
    const [message, setMessage] = useState<string | null>(null)
    const [isMapVisible, setIsMapVisible] = useState(false) // New state for map visibility

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            setSelectedLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)

        try {
            const res = await addLocation({
                name: title,
                description,
                taxonomy,
                address,
                latitude: selectedLocation ? selectedLocation.lat : 0,
                longitude: selectedLocation ? selectedLocation.lng : 0
            })
            setMessage(res.message)
        } catch (error: any) {
            setMessage(error.message)
            console.error("Error submitting location:", error)
        }
    }

    return (
        <div className='px-4 w-full' id='add-new-place'>
            <div className='flex justify-between items-center mt-6 w-full'>
                <h1
                    className={`font-bold text-xl ${museumModerno.className} break-words whitespace-normal`}
                >
                    Add Location
                </h1>

                <span className='inline-block'>
                    <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                        <CoinIcon className='w-4 h-4 text-white' />
                        <span className='mt-1 ml-1 text-xs text-white'>+ {150}</span>
                    </div>
                </span>
            </div>
            <p className={`${museumModerno.className} mt-2`}>
                If people check in at the place you've added, you earn 1 point for each check-in.
            </p>
            <form
                onSubmit={handleSubmit}
                className='w-full  bg-white rounded-xl flex flex-col mt-6'
            >
                <div className='mb-4'>
                    <label
                        className={`block text-md font-medium text-black ${museumModerno.className}`}
                    >
                        Title
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs ${museumModerno.className}`}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        className={`block text-md font-medium text-black ${museumModerno.className}`}
                    >
                        Address
                    </label>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs ${museumModerno.className}`}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        className={`block text-md font-medium text-black ${museumModerno.className}`}
                    >
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`'mt-1 h-24 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs ${museumModerno.className}`}
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
                            control: (provided, state) => ({
                                ...provided,
                                backgroundColor: "white",
                                zIndex: 1000, // Ensure dropdown is above the map
                                "&:hover": {
                                    borderColor: state.isFocused ? "#FF1493" : "#6b7280" // Tailwind's gray-500
                                }
                            }),
                            menu: (provided) => ({
                                ...provided,
                                zIndex: 1000 // Ensure dropdown menu is above the map
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                fontSize: "12px" // smaller text
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? "#FF1493" : "white",
                                color: state.isSelected ? "white" : "black",
                                fontSize: "12px" // smaller text
                            })
                        }}
                    />
                </div>
                <div className='mb-4'>
                    <button
                        className={`block text-sm font-medium text-black text-center w-full ${museumModerno.className} mt-1`}
                        onClick={() => setIsMapVisible(true)}
                    >
                        Choose on Map
                    </button>

                    {isMapVisible && (
                        <LoadScriptNext
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
                                    <OverlayView
                                        position={selectedLocation}
                                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                    >
                                        <LiveLocationPin />
                                    </OverlayView>
                                )}
                            </GoogleMap>
                        </LoadScriptNext>
                    )}
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
        </div>
    )
}

export default AddLocation
