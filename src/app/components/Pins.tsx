import {Location} from "../lib/types"
import Image from "next/image"

// border-white or border-black for live location pin

export const LiveLocationPin = () => (
    <div className='relative flex items-center justify-center w-10 h-10'>
        <div className='absolute w-full h-full rounded-full animate-ping opacity-75 bg-[#FF1493]'></div>
        <div className='absolute w-full h-full rounded-full shadow-2xl shadow-[#FF1493]/50'></div>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='#ffffff'
            className='relative w-8 h-8'
        >
            <path
                d='M4.47046 17.0591L10.2111 5.57771C10.9482 4.10361 13.0518 4.10362 13.7889 5.57771L19.5295 17.0591C20.3661 18.7322 18.6528 20.5356 16.9391 19.7858L12.4008 17.8004C12.1453 17.6886 11.8547 17.6886 11.5992 17.8004L7.06094 19.7858C5.34719 20.5356 3.6339 18.7322 4.47046 17.0591Z'
                stroke='#000000'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
            />
        </svg>
    </div>
)

export const ItemPin: React.FC<{location: Location; isSelected: boolean}> = ({
    location,
    isSelected
}) => {
    if (location.checkedIn === true) {
        return (
            <div className='relative w-6 h-6'>
                <div className={`absolute w-6 h-6 rounded-full border-4 border-black bg-green-400`}>
                    <span></span>
                </div>
            </div>
        )
    } else if (location.isTheme) {
        return (
            <div className='relative w-10 h-10'>
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
        console.log(location.pin)
        return (
            <div className='relative w-8 h-8'>
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

    let bgColor = ""

    switch (location.taxonomy) {
        case "ATTRACTION":
            bgColor = "#FFFFFF"
            break
        case "EVENT":
            bgColor = "#FFFFED"
            break
        case "EXPERIENCE":
            bgColor = "#FFD1DF"
            break
        case "LIMITED_TIME":
            bgColor = "#C9FFCE"
            break
        case "REWARD":
            bgColor = "#C9FFCE"
            break
        default:
            bgColor = "#FFFFFF" // default color if type is not recognized
    }

    if (isSelected) {
        bgColor = "#FF1493" // pink color for selected pin
    }

    return (
        <div className='relative'>
            <div
                className={`absolute w-6 h-6 rounded-full border-4 border-black flex justify-center items-center`}
                style={{backgroundColor: bgColor}}
            ></div>
        </div>
    )
}
