import {CoinIcon} from "../lib/CustomIcons"
import {MuseoModerno} from "next/font/google"
import React from "react"
import Image from "next/image"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function Theme() {
    return (
        <>
            <div className='px-6'>
                <div className='flex justify-between items-center mt-4'>
                    <h1
                        className={`font-bold text-xl ${museoModerno.className} break-words whitespace-normal`}
                    >
                        Theme of the Month
                    </h1>
                    <span className='inline-block'>
                        <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                            <CoinIcon className='w-4 h-4 text-white' />
                            <span className='mt-1 ml-1 text-xs text-white'>+ {200}</span>
                        </div>
                    </span>
                </div>

                <p className={`my-1 text-sm ${museoModerno.className} mb-1`}>
                    Complete the path to get rewards. Check in following places to get Hölderlin
                    Badge only for this month.
                </p>
            </div>

            <div className='w-full flex gap-4 '>
                <div className='w-1/3 flex flex-col items-center'>
                    <div className='relative h-[120px] w-full'>
                        <Image src='/holderlin.png' alt='Holderlin Image' fill objectFit='cover' />
                    </div>
                    <div className={`text-center text-xs mt-2  ${museoModerno.className}`}>
                        Hölderlintrum
                    </div>
                </div>
                <div className='w-1/3 flex flex-col items-center'>
                    <div className='relative h-[120px] w-full opacity-40'>
                        <Image
                            src='/holderlin.png'
                            alt='Tomb of Hölderlin'
                            fill
                            objectFit='cover'
                        />
                    </div>
                    <div className={`text-center text-xs mt-2 ${museoModerno.className}`}>
                        Tomb of Hölderlin
                    </div>
                </div>
                <div className='w-1/3 flex flex-col items-center'>
                    <div className='relative h-[120px] w-full opacity-40'>
                        <Image
                            src='/holderlin.png'
                            alt='Hölderlinturm Museumscafé'
                            fill
                            objectFit='cover'
                        />
                    </div>
                    <div className={`text-center text-xs mt-2 ${museoModerno.className}`}>
                        Hölderlinturm Museumscafé
                    </div>
                </div>
            </div>
        </>
    )
}

export default Theme
