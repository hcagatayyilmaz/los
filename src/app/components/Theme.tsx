import {CoinIcon} from "../lib/CustomIcons"
import {MuseoModerno} from "next/font/google"
import React from "react"
import Badge from "./Badge"
import StreakParent from "./StreakParent"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function Theme({badge}: {badge: any}) {
    console.log("Badge:", badge)
    return (
        <>
            <div className='px-6'>
                <div className='flex justify-between items-center mt-4'>
                    <h1
                        className={`font-bold text-xl ${museoModerno.className} break-words whitespace-normal`}
                    >
                        Tasks of the Month
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
            <Badge data={badge} /> {/* Pass badge as data */}
            <StreakParent />
        </>
    )
}

export default Theme
