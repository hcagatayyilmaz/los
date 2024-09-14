import {Location} from "../lib/types"
import Image from "next/image"
import {Marker} from "@react-google-maps/api"
import React, {useMemo} from "react"
import {FaCheck} from "react-icons/fa"
import {EventIcon} from "../lib/CustomIcons"

export const LiveLocationPin: React.FC = React.memo(() => (
  <div className='relative group'>
    <div className='absolute w-6 h-6 bg-[#FF1493] border-dashed rounded-full border-4 border-white shadow-2xl shadow-[#FF1493]/50 group-hover:scale-150 transition-transform duration-200'></div>
    <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75 group-hover:scale-150 transition-transform duration-200'></div>
  </div>
))
LiveLocationPin.displayName = "LiveLocationPin"

const EventDateDisplay: React.FC<{date: string; zoomLevel?: number}> = ({
  date,
  zoomLevel
}) => {
  if (zoomLevel && zoomLevel < 14) {
    return null
  }

  const dateObj = new Date(date)
  const month = dateObj
    .toLocaleString("default", {month: "short"})
    .toUpperCase()
  const day = dateObj.getDate().toString().padStart(2, "0")
  return (
    <div className='absolute -top-6 -right-4 text-white text-xs flex flex-col items-center justify-center w-7 h-7  rounded-full'>
      <p className='text-[8px] uppercase font-bold bg-customYellow w-full text-center rounded-t-lg'>
        {month}
      </p>
      <p className='text-[8px] text-black bg-white w-full text-center font-extrabold rounded-b-lg'>
        {day}
      </p>
    </div>
  )
}

export const ItemPin = React.memo<{
  location: Location
  isSelected: boolean
  zoomLevel?: number
  isSynthetic?: boolean
  updateSelectedLocation: (location: Location) => void
}>(({location, isSelected, zoomLevel, isSynthetic, updateSelectedLocation}) => {
  const {sizeClass, scaleClass} = useMemo(() => {
    let sizeClass = "w-8 h-8"
    if (!isSynthetic && !location.checkedIn && zoomLevel !== undefined) {
      if (zoomLevel < 13) {
        sizeClass = "w-5 h-5"
      } else if (zoomLevel < 15) {
        sizeClass = "w-8 h-8"
      } else if (zoomLevel > 16) {
        sizeClass = "w-12 h-12"
      }
    }
    const scaleClass = isSelected ? "transform scale-[2]" : ""
    return {sizeClass, scaleClass}
  }, [isSynthetic, location.checkedIn, zoomLevel, isSelected])

  const baseClassName = `relative group transition-transform duration-200 ${scaleClass} ${sizeClass}`

  // Checked-in logic
  if (location.checkedIn) {
    return (
      <Marker
        onClick={() => updateSelectedLocation(location)}
        icon={{
          url: "/checked-in.svg",
          scaledSize: new window.google.maps.Size(
            isSelected ? 32 : 16,
            isSelected ? 32 : 16
          ),
          anchor: new window.google.maps.Point(
            isSelected ? 24 : 12,
            isSelected ? 24 : 12
          )
        }}
        position={{lat: location.latitude, lng: location.longitude}}
      />
    )
  } else if (isSynthetic) {
    return (
      <Marker
        onClick={() => updateSelectedLocation(location)}
        icon={{
          url: "/synthetic.svg",
          scaledSize: new window.google.maps.Size(
            isSelected ? 32 : 16,
            isSelected ? 32 : 16
          ),
          anchor: new window.google.maps.Point(
            isSelected ? 24 : 12,
            isSelected ? 24 : 12
          )
        }}
        position={{lat: location.latitude, lng: location.longitude}}
      />
    )
  } else if (location.taxonomy === "EVENT" && location.endDate) {
    if (location.pin && location.endDate) {
      const endDate = new Date(location.endDate)
      return (
        <svg
          className={`${baseClassName} relative`}
          style={{transform: isSelected ? "scale(2)" : "none"}}
          width='100%'
          height='100%'
          viewBox='0 0 100 100'
        >
          <image
            href={location.pin}
            width='100'
            height='100'
            preserveAspectRatio='xMidYMid meet'
          />
          <svg x='50' y='0' width='32' height='32' viewBox='0 0 50 50'>
            <EventIcon endDate={endDate} zoomLevel={zoomLevel} />
          </svg>
        </svg>
      )
    } else {
      const endDate = new Date(location.endDate)
      return <EventIcon endDate={endDate} zoomLevel={zoomLevel} />
    }
  } else if (location.pin) {
    return (
      <Marker
        onClick={() => updateSelectedLocation(location)}
        icon={{
          url: location.pin,
          scaledSize: new window.google.maps.Size(
            isSelected ? 64 : 32,
            isSelected ? 64 : 32
          ),
          anchor: new window.google.maps.Point(
            isSelected ? 32 : 16,
            isSelected ? 64 : 32
          )
        }}
        position={{lat: location.latitude, lng: location.longitude}}
      />
    )
  } else {
    return (
      <Marker
        onClick={() => updateSelectedLocation(location)}
        icon={{
          url: "/poi.png",
          scaledSize: new window.google.maps.Size(
            isSelected ? 64 : 32,
            isSelected ? 64 : 32
          ),
          anchor: new window.google.maps.Point(
            isSelected ? 32 : 16,
            isSelected ? 64 : 32
          )
        }}
        position={{lat: location.latitude, lng: location.longitude}}
      />
    )
  }
})

ItemPin.displayName = "ItemPin"
