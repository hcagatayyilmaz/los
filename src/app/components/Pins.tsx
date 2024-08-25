import {Location} from "../lib/types"
import Image from "next/image"

// border-white or border-black for live location pin

export const LiveLocationPin = () => (
    <div className='relative group'>
        <div className='absolute w-6 h-6 bg-[#FF1493] border-dashed rounded-full border-4 border-white shadow-2xl shadow-[#FF1493]/50 group-hover:scale-150 transition-transform duration-200'></div>
        <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75 group-hover:scale-150 transition-transform duration-200'></div>
    </div>
)

export const ItemPin: React.FC<{location: Location; isSelected: boolean}> = ({
    location,
    isSelected
}) => {
    if (location.checkedIn === true) {
        return (
            <div className='relative group w-6 h-6'>
                <div
                    className={`absolute w-6 h-6 rounded-full border-4 border-black bg-green-400 group-hover:scale-150 transition-transform duration-200`}
                >
                    <span></span>
                </div>
            </div>
        )
    } else if (location.isTheme) {
        return (
            <div className='relative group w-10 h-10'>
                <Image
                    src='/holderlin.png'
                    alt='Theme Pin'
                    fill
                    objectFit='contain'
                    className='absolute group-hover:scale-150 transition-transform duration-200'
                />
            </div>
        )
    } else if (location.pin !== null) {
        return (
            <div className='relative group w-8 h-8'>
                <Image
                    src={location.pin}
                    alt='Location Pin'
                    fill
                    objectFit='contain'
                    className='absolute group-hover:scale-150 transition-transform duration-200'
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
        <div className='relative group w-8 h-8'>
            {/* <div
                className={`absolute w-5 h-5 rounded-full border-4 border-black flex justify-center items-center group-hover:scale-150 transition-transform duration-200`}
                style={{backgroundColor: bgColor}}
            ></div> */}
            <Image
                src={"/poi.png"}
                alt='Location Pin'
                fill
                objectFit='contain'
                className='absolute group-hover:scale-150 transition-transform duration-200'
            />
        </div>
    )
}
