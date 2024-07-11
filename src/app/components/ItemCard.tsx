import {CoinIcon} from "../lib/CustomIcons"
import Image from "next/image"

export const ItemCard = () => {
    return (
        <div className='absolute bottom-2 left-2 right-2 bg-white rounded-3xl shadow-lg p-4 flex items-start space-x-4 mx-2 border-8 border-customYellow'>
            <div className='w-1/3 h-full relative'>
                <Image
                    src='/tuebingen.jpg' // Path to the image in the public directory
                    alt='Markplatz'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                />
            </div>
            <div className='w-2/3'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'>Markplatz</h2>
                </div>
                <p className='text-gray-600 text-sm'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus, felis
                    consequat.
                </p>
                <div className='flex items-center mt-4'>
                    <div className='flex items-center bg-pink-100 text-pink-500 rounded-full px-4 py-2 mr-4'>
                        <CoinIcon className='text-pink-500' />
                        <span className='ml-2 text-md'>100</span>
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
