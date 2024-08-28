import {Location} from "../lib/types"
import Image from "next/image"

// border-white or border-black for live location pin

export const LiveLocationPin = () => (
  <div className='relative group'>
    <div className='absolute w-6 h-6 bg-[#FF1493] border-dashed rounded-full border-4 border-white shadow-2xl shadow-[#FF1493]/50 group-hover:scale-150 transition-transform duration-200'></div>
    <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75 group-hover:scale-150 transition-transform duration-200'></div>
  </div>
)

export const ItemPin: React.FC<{
  location: Location
  isSelected: boolean
  zoomLevel?: number
}> = ({location, isSelected, zoomLevel}) => {
  const scaleClass = isSelected ? "scale-150" : ""
  const baseClassName = `relative group transition-transform duration-200 ${scaleClass}`

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
  } else if (location.pin !== null) {
    return (
      <div className={`${baseClassName} w-8 h-8`}>
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

  let bgColor = isSelected ? "#FF1493" : "#FFFFFF"

  switch (location.taxonomy) {
    case "ATTRACTION":
      bgColor = isSelected ? "#FF1493" : "#FFFFFF"
      break
    case "EVENT":
      bgColor = isSelected ? "#FF1493" : "#FFFFED"
      break
    case "EXPERIENCE":
      bgColor = isSelected ? "#FF1493" : "#FFD1DF"
      break
    case "LIMITED_TIME":
    case "REWARD":
      bgColor = isSelected ? "#FF1493" : "#C9FFCE"
      break
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
