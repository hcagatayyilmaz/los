import {Location} from "../lib/types"

export const LiveLocationPin = () => (
    <div className='relative'>
        <div className='absolute w-6 h-6 bg-[#FF1493] border-dashed rounded-full border-4 border-black shadow-2xl shadow-[#FF1493]/50'></div>
        <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75'></div>
    </div>
)

export const ItemPin: React.FC<{location: Location}> = ({location}) => {
    let bgColor = ""

    switch (location.type) {
        case "MAIN_ATTRACTION":
            bgColor = "#FFE888"
            break
        case "HIDDEN_WONDERS":
            bgColor = "#FFBBDD"
            break
        case "EXPERINCE":
            bgColor = "#C0EFFF"
            break
        case "LIMITED_TIME":
            bgColor = "#C9FFCE"
            break
        default:
            bgColor = "#FFFFFF" // default color if type is not recognized
    }

    return (
        <div className='relative'>
            <div
                className={`absolute w-6 h-6 rounded-full border-4 border-black`}
                style={{backgroundColor: bgColor}}
            ></div>
        </div>
    )
}
