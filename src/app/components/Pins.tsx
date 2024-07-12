import {Location} from "../lib/types"
export const LiveLocationPin = () => (
    <div className='relative'>
        <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full border-4 border-[#C71585] shadow-2xl shadow-[#FF1493]/50'></div>
        <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75'></div>
    </div>
)

export const ItemPin: React.FC<{location: Location}> = ({location}) => {
    if (location.type === 1) {
        return (
            <div className='relative'>
                <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full border-4 border-[#C71585] shadow-2xl shadow-[#FF1493]/50'></div>
                <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75'></div>
            </div>
        )
    } else {
        return (
            <div className='relative'>
                <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full border-4 border-[#C71585] shadow-2xl shadow-[#FF1493]/50'></div>
                <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75'></div>
            </div>
        )
    }
}
