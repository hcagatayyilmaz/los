import {CoinIcon} from "../lib/CustomIcons"
import Image from "next/image"
import {Location} from "../lib/types"
import ItemButtonGroup from "./ItemButtonGroup"

type ItemCardProps = {
    location: Location
}

export const ItemCard = ({location}: ItemCardProps) => {
    return (
        <div className='h-48 w-full bg-white rounded-3xl shadow-lg p-2 flex gap-2 items-start justify-between border-2 border-customYellow cursor-pointer'>
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
                        <h2 className='text-lg font-bold whitespace-normal break-words'>
                            {location.name}
                        </h2>
                    </div>
                    <p className='text-gray-600 text-sm whitespace-normal break-words'>
                        {location.description}
                    </p>
                </div>
                <ItemButtonGroup location={location} />
            </div>
        </div>
    )
}

export default ItemCard
