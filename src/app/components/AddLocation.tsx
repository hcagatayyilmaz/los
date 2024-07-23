"use client"
import React, {useState} from "react"
import {MapContainer, TileLayer, Marker, useMapEvents} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import {MuseoModerno} from "next/font/google"
import {CoinIcon} from "@/app/lib/CustomIcons"
import {LiveLocationPin} from "./Pins"
import L from "leaflet"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

const AddLocation: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(
        null
    )
    const [description, setDescription] = useState("")

    const LocationMarker = () => {
        useMapEvents({
            click(e: any) {
                setSelectedLocation(e.latlng)
            }
        })

        return selectedLocation ? (
            <Marker
                position={selectedLocation}
                icon={L.divIcon({
                    className: "custom-div-icon",
                    html: `<div class="relative">
                              <div class="absolute w-6 h-6 bg-[#FF1493] border-dashed rounded-full border-4 border-white  shadow-[#FF1493]/50"></div>
                              <div class="absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75"></div>
                           </div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                })}
            ></Marker>
        ) : null
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log("Submitted:", {selectedLocation, description})
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
                        <span className='mt-1 ml-1 text-xs text-white'>+ {120}</span>
                    </div>
                </span>
            </div>
            <form
                onSubmit={handleSubmit}
                className='w-full max-w-md bg-white rounded-xl  flex flex-col mt-6'
            >
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Location</label>
                    <MapContainer
                        center={[48.519446747786135, 9.057645] as any}
                        zoom={13}
                        style={{height: "300px", width: "100%"}}
                    >
                        <TileLayer
                            url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`}
                            id='mapbox/streets-v11'
                            accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                        />
                        <LocationMarker />
                    </MapContainer>
                    {selectedLocation && (
                        <div className='mt-2 text-sm text-black text-center'>
                            Location <br />
                            {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                        </div>
                    )}
                </div>
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
