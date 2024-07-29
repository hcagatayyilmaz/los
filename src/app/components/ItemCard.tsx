import {CoinIcon} from "../lib/CustomIcons"
import Image from "next/image"
import {Location} from "../lib/types"
import ItemButtonGroup from "./ItemButtonGroup"

type ItemCardProps = {
    location: Location
}

export const ItemCard = ({location}: ItemCardProps) => {
    return (
        <div className='w-full max-w-md bg-white rounded-xl shadow-xl p-4 flex flex-col border border-gray-300'>
            <div className='flex'>
                {location.imageUrl && (
                    <div className='w-1/3 h-24 relative'>
                        <Image
                            src={location.imageUrl}
                            fill
                            style={{objectFit: "cover"}}
                            className='rounded-lg'
                            alt='Location Image'
                        />
                    </div>
                )}
                <div className={`pl-4 ${location.imageUrl ? "w-2/3" : "w-full"}`}>
                    <h2 className='text-md font-bold text-wrap'>{location.name_en}</h2>
                    {/* <div className='flex items-center text-pink-500 my-2'>
            <CoinIcon className='w-5 h-5 mr-1' />
            <span className='font-semibold'>{location.points}</span>
        </div> */}
                    <p className='text-gray-500 text-xs text-wrap'>{location.description_en}</p>
                </div>
            </div>
            <div className='w-full mt-4'>
                <ItemButtonGroup location={location} />
            </div>
        </div>
    )
}

export default ItemCard
