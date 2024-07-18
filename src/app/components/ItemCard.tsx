import {CoinIcon} from "../lib/CustomIcons"
import Image from "next/image"
import {Location} from "../lib/types"
import ItemButtonGroup from "./ItemButtonGroup"

type ItemCardProps = {
    location: Location
}

export const ItemCard = ({location}: ItemCardProps) => {
    return (
        <div className='w-full max-w-md bg-white rounded-xl shadow-md p-4 flex flex-col border border-gray-200'>
            <div className='flex'>
                <div className='w-1/3 h-24 relative'>
                    {location.imageUrl && (
                        <Image
                            src={location.imageUrl}
                            layout='fill'
                            objectFit='cover'
                            className='rounded-lg'
                            alt='Tübingen, Germany'
                        />
                    )}
                </div>
                <div className='w-2/3 pl-4'>
                    <h2 className='text-md font-bold text-wrap'>{location.name}</h2>
                    {/* <div className='flex items-center text-pink-500 my-2'>
                        <CoinIcon className='w-5 h-5 mr-1' />
                        <span className='font-semibold'>{location.points}</span>
                    </div> */}
                    <p className='text-gray-500 text-xs text-wrap'>
                        {location.meta.description.de}
                    </p>
                </div>
            </div>
            <div className='w-full mt-4'>
                <ItemButtonGroup location={location} />
            </div>
        </div>
    )
}

export default ItemCard
