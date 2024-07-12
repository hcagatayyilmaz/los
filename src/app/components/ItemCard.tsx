import {CoinIcon} from "../lib/CustomIcons"
import Image from "next/image"
import {Location} from "../lib/types"

type ItemCardProps = {
    location: Location
}

export const ItemCard = ({location}: ItemCardProps) => {
    return (
        <div className='h-48 w-[96vw] bg-white rounded-3xl shadow-lg p-2 flex gap-2 items-start justify-between border-4 border-customYellow cursor-pointer'>
            <div className='w-1/3 h-full relative'>
                <Image
                    src='/tuebingen.jpg'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                    alt='Tübingen, Germany'
                />
            </div>
            <div className='w-2/3 h-full flex flex-col justify-between'>
                <div>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-lg font-bold'>{location.name}</h2>
                    </div>
                    <p className='text-gray-600 text-sm'>{location.description}</p>
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center bg-pink-100 text-pink-500 rounded-full px-4 py-2 mr-4'>
                        <CoinIcon className='text-pink-500' />
                        <span className='ml-2 text-sm'>{location.points}</span>
                    </div>
                    <button className='bg-green-800 text-white rounded-full px-4 py-2'>
                        Check In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
