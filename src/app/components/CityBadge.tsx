import Streak from "./Streak"
import React from "react"
import {MuseoModerno} from "next/font/google"
import {CoinIcon} from "../lib/CustomIcons"

const museoModerno = MuseoModerno({
  subsets: ["latin"]
})

function CityBadge({
  name,
  description,
  image,
  numberOfCheckIn,
  points
}: {
  name: string
  description: string
  image: string
  numberOfCheckIn: number
  points: number
}) {
  const streaks = Array.from({length: 5}, (_, index) => (
    <Streak key={index} completed={numberOfCheckIn > index} image={image} />
  ))

  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='flex justify-between px-4'>
        <h1 className={` mt-2 text-xl font-bold ${museoModerno.className}`}>
          {name}
        </h1>
        {points && (
          <span className='inline-block'>
            <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
              <CoinIcon className='w-4 h-4 text-white' />
              <span className='mt-1 ml-1 text-xs text-white'>+ {points}</span>
            </div>
          </span>
        )}
      </div>
      <p className={`px-4 ${museoModerno.className} text-sm`}>{description}</p>
      <div className='flex mt-2 flex-row flex-wrap gap-4 px-4'>
        {numberOfCheckIn > 5 ? (
          <React.Fragment>
            <Streak completed={true} image={image} />
            <Streak completed={true} image={image} />
            <Streak completed={true} image={image} />
            <Streak completed={true} image={image} />
            <Streak completed={true} image={image} />
          </React.Fragment>
        ) : (
          streaks
        )}
      </div>
    </div>
  )
}

export default CityBadge
