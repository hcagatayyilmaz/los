"use client"
import React, {useState} from "react"
import Select from "react-select"
import {addLocation} from "@/app/server"
import {MdOutlineCancel} from "react-icons/md"
import {MuseoModerno} from "next/font/google"
import {GoogleMap, LoadScriptNext, Marker} from "@react-google-maps/api"

const museoModerno = MuseoModerno({
  subsets: ["latin"]
})

const options = [
  {value: "ATTRACTION", label: "Attraction"},
  {value: "EVENT", label: "Event"},
  {value: "EXPERIENCE", label: "Experience"}
]

const mapContainerStyle = {
  width: "100%",
  height: "300px"
}

// Default location for Berlin
const berlinLocation = {
  lat: 52.52,
  lng: 13.405
}

const AddLocationPopup: React.FC<{
  onClose: () => void
  userLocation: {lat: number; lng: number} | undefined
}> = ({onClose, userLocation}) => {
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [taxonomy, setTaxonomy] = useState<
    "ATTRACTION" | "EVENT" | "EXPERIENCE"
  >("ATTRACTION")
  const [message, setMessage] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    try {
      const res = await addLocation({
        name: title,
        description,
        taxonomy,
        address,
        latitude: currentLocation?.lat || berlinLocation.lat,
        longitude: currentLocation?.lng || berlinLocation.lng
      })
      setMessage(res.message)
      onClose() // Close the popup on successful submission
    } catch (error: any) {
      setMessage(error.message)
      console.error("Error submitting location:", error)
    }
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setCurrentLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      })
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center ${museoModerno.className}`}
    >
      <div
        className='fixed inset-0 bg-black bg-opacity-75 z-[999]'
        onClick={onClose}
      ></div>
      <div className='relative bg-white rounded-xl p-6 w-full max-w-md z-[1000]'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>Add new checkpoint</h2>
          <button type='button' onClick={onClose}>
            <MdOutlineCancel className='w-6 h-6' />
          </button>
        </div>
        <p>
          Please provide details for the new checkpoint and select a location by
          clicking on the map.
        </p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-xl font-medium mt-2'>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs'
            />
          </div>

          <div>
            <label className='block text-xl font-medium mt-2'>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-1 block w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow text-xs'
            />
          </div>
          <div>
            <label className='block text-xl font-medium mb-1 mt-2'>Type</label>
            <Select
              value={options.find((option) => option.value === taxonomy)}
              onChange={(option) =>
                setTaxonomy(
                  option?.value as "ATTRACTION" | "EVENT" | "EXPERIENCE"
                )
              }
              options={options}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "white",
                  zIndex: 1001,
                  "&:hover": {
                    borderColor: state.isFocused ? "#FF1493" : "#6b7280"
                  }
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 1001
                }),
                singleValue: (provided) => ({
                  ...provided,
                  fontSize: "12px"
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#FF1493" : "white",
                  color: state.isSelected ? "white" : "black",
                  fontSize: "12px"
                })
              }}
            />
          </div>

          <div className='relative mb-4'></div>

          {message && (
            <div className='text-center text-sm text-customYellow'>
              {message}
            </div>
          )}

          <div className='flex justify-between'>
            <button
              type='submit'
              className='bg-customYellow text-white py-2 w-full px-4 rounded-xl hover:bg-black transition duration-200'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLocationPopup
