import {CoinIcon} from "../lib/CustomIcons"
import Image from "next/image"

export const ItemCard = () => {
    return (
        <div className='absolute bottom-2 h-48 left-2 right-2 bg-white rounded-2xl shadow-lg p-2 flex gap-2 items-start justify-between mx-1 border-4 border-customYellow'>
            <div className='w-1/3 h-full relative'>
                <Image
                    src='/tuebingen.jpg' // Ensure this path is correct and the image is in the public directory
                    alt='Markplatz'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-2xl'
                />
            </div>
            <div className='w-2/3 flex flex-col justify-between h-full'>
                <div>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-lg font-bold'>Markplatz</h2>
                    </div>
                    <p className='text-gray-600 text-sm'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus, felis
                        consequat.
                    </p>
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center bg-pink-100 text-pink-500 rounded-full px-4 py-2 mr-4'>
                        <CoinIcon className='text-pink-500' />
                        <span className='ml-2 text-sm'>100</span>
                    </div>
                    <button className='bg-green-800 text-white text-sm rounded-full px-4 py-2'>
                        Check In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
