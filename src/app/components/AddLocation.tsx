"use client"
import React, {useState} from "react"
import {
  GoogleMap,
  LoadScript,
  LoadScriptNext,
  OverlayView
} from "@react-google-maps/api"
import {MuseoModerno} from "next/font/google"
import {CoinIcon} from "@/app/lib/CustomIcons"
import Select from "react-select"
import {addLocation} from "@/app/server" // Adjust the import path as necessary
import {mapStyleWithoutText} from "../lib/style"
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
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [taxonomy, setTaxonomy] = useState<
    "ATTRACTION" | "EVENT" | "EXPERIENCE" | null
  >(null)
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
        taxonomy: taxonomy!,
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

  const handleTaxonomyClick = (
    selectedTaxonomy: "ATTRACTION" | "EVENT" | "EXPERIENCE"
  ) => {
    if (taxonomy === selectedTaxonomy) {
      setTaxonomy(null)
    } else {
      setTaxonomy(selectedTaxonomy)
    }
  }

  return (
    <div className=' w-full bg-pink-100 mt-2' id='add-new-place'>
      <div className='w-full bg-white px-4 pb-4'>
        <div className='flex justify-between items-center mt-6 w-full '>
          <h1
            className={`font-bold text-xl ${museumModerno.className} break-words whitespace-normal`}
          >
            Add Location
          </h1>

          <span className='inline-block'>
            <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
              <CoinIcon className='w-4 h-4 text-white' />
              <span className='mt-1 ml-1 text-xs text-white'>+ {500}</span>
            </div>
          </span>
        </div>
        <p className={`${museumModerno.className} mt-2`}>
          Share your best experiences for your city to boost your points. If
          people check in at the place you&apos;ve added, you earn 10%
          commission. for each check-in.
        </p>
        <p className={`${museumModerno.className} mt-2 text-xs`}>
          Please read the guidelines before adding places. If a place does not
          meet the guidelines, it will not be displayed on the app. Reviews may
          take up to 7 days.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-full bg-pink-100 rounded-xl flex flex-col mt-4 px-4 pb-4'
      >
        <div className=' flex justify-between'>
          <button
            type='button'
            onClick={() => handleTaxonomyClick("ATTRACTION")}
            className={`px-6 py-3 rounded-xl text-md ${"bg-customYellow text-white"}`}
          >
            Attraction
          </button>
          <button
            type='button'
            onClick={() => handleTaxonomyClick("EVENT")}
            className={`px-6 py-3 rounded-xl text-md ${"bg-customYellow text-white"}`}
          >
            Event
          </button>
          <button
            type='button'
            onClick={() => handleTaxonomyClick("EXPERIENCE")}
            className={`px-6 py-3 rounded-xl text-md ${"bg-customYellow text-white"}`}
          >
            Experience
          </button>
        </div>

        {taxonomy && (
          <>
            <div className='my-4'>
              <label
                className={`block text-md font-medium text-black ${museumModerno.className}`}
              >
                Name
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs ${museumModerno.className}`}
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
                className={`mt-1 h-24 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs ${museumModerno.className}`}
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
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs ${museumModerno.className}`}
              />
            </div>
            {taxonomy === "EVENT" && (
              <div className='mb-4'>
                <label
                  className={`block text-md font-medium text-black ${museumModerno.className}`}
                >
                  Date
                </label>
                <input
                  type='date'
                  onChange={(e) => {
                    /* Handle date change */
                  }}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs ${museumModerno.className}`}
                />
              </div>
            )}
            <div className='mb-4'>
              {selectedLocation && (
                <div className='mt-2 text-sm text-black font-bold text-center'>
                  Location <br />
                  {selectedLocation.lat.toFixed(4)},{" "}
                  {selectedLocation.lng.toFixed(4)}
                </div>
              )}
            </div>
            {message && (
              <div className='mb-2 text-center text-sm text-customYellow'>
                {message}
              </div>
            )}
            <button
              type='submit'
              className='bg-customYellow text-white py-2 px-4 rounded-xl hover:bg-black transition duration-200'
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  )
}

export default AddLocation
