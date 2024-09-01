import {Location} from "../lib/types"
import Image from "next/image"
import {FaStar} from "react-icons/fa"
import React, {useMemo} from "react"
// border-white or border-black for live location pin

export const LiveLocationPin: React.FC = React.memo(() => (
  <div className='relative group'>
    <div className='absolute w-6 h-6 bg-[#FF1493] border-dashed rounded-full border-4 border-white shadow-2xl shadow-[#FF1493]/50 group-hover:scale-150 transition-transform duration-200'></div>
    <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75 group-hover:scale-150 transition-transform duration-200'></div>
  </div>
))

LiveLocationPin.displayName = "LiveLocationPin"

const colors = [
  {background: "#ffffff", text: "#FF1493"}, // gold
  {background: "#ffffff", text: "#FF1493"}, //neon green
  {background: "#ffffff", text: "#FF1493"}, //pink
  {background: "#ffffff", text: "#FF1493"} // black
]

const EventDateDisplay: React.FC<{date: string}> = ({date}) => {
  const dateObj = new Date(date)
  const month = dateObj
    .toLocaleString("default", {month: "short"})
    .toUpperCase()
  const day = dateObj.getDate().toString().padStart(2, "0")
  return (
    <div className='absolute -top-6 -right-4 text-white text-xs flex flex-col items-center justify-center w-6 h-6  rounded-full'>
      <p className='text-[7px] uppercase font-bold bg-customRed w-full text-center'>
        {month}
      </p>
      <p className='text-[7px] text-black bg-white w-full text-center font-extrabold'>
        {day}
      </p>
    </div>
  )
}

export const ItemPin: React.FC<{
  location: Location
  isSelected: boolean
  zoomLevel?: number
  isSynthetic?: boolean
}> = ({location, isSelected, zoomLevel, isSynthetic}) => {
  const scaleClass = isSelected ? "scale-150" : ""
  const baseClassName = `relative group transition-transform duration-200 ${scaleClass}`

  const syntheticColor = useMemo(() => {
    if (isSynthetic) {
      const colorIndex = parseInt(location.id, 36) % colors.length
      return colors[colorIndex]
    }
    return null
  }, [isSynthetic, location.id])

  if (isSynthetic && syntheticColor) {
    return (
      <div
        className={`${baseClassName} w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-black`}
        style={{
          backgroundColor: syntheticColor.background
        }}
      >
        <FaStar
          style={{color: syntheticColor.text}}
          size={8}
          className='text-center'
        />
      </div>
    )
  }

  if (location.checkedIn === true) {
    return (
      <div className={`${baseClassName} w-6 h-6`}>
        <div className='absolute w-6 h-6 rounded-full border-4 border-black bg-green-400'>
          <span></span>
        </div>
      </div>
    )
  } else if (location.isTheme) {
    return (
      <div className={`${baseClassName} w-12 h-12`}>
        <Image
          src='/holderlin.png'
          alt='Theme Pin'
          fill
          objectFit='contain'
          className='absolute'
        />
      </div>
    )
  } else if (
    location.taxonomy === "EVENT" &&
    location.pin &&
    location.endDate
  ) {
    const endDate = new Date(location.endDate) // Ensure endDate is a Date object
    return (
      <div className={`${baseClassName} w-8 h-8 relative`}>
        <Image
          src={location.pin}
          alt='Location Pin'
          fill
          objectFit='contain'
          className='absolute'
        />
        <EventDateDisplay date={endDate.toISOString()} />
      </div>
    )
  } else if (location.pin) {
    return (
      <div className={`${baseClassName} w-8 h-8 relative`}>
        <Image
          src={location.pin}
          alt='Location Pin'
          fill
          objectFit='contain'
          className='absolute'
        />
      </div>
    )
  }

  return (
    <div className={`${baseClassName} w-8 h-8`}>
      <Image
        src={"/poi.png"}
        alt='Location Pin'
        fill
        objectFit='contain'
        className='absolute'
      />
    </div>
  )
}
