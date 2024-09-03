import Image from "next/image"
import Link from "next/link"
import {Location} from "../lib/types"
import ItemButtonGroup from "./ItemButtonGroup"
import {FaDirections} from "react-icons/fa"
import {CoinIcon} from "../lib/CustomIcons"

type ItemCardListProps = {
  location: Location
}

export const ItemCardList = ({location}: ItemCardListProps) => {
  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}&travelmode=transit&dir_action=navigate`

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
        <div
          className={`pl-4 flex justify-between items-center ${
            location.imageUrl ? "w-2/3" : "w-full"
          }`}
        >
          <h2 className='text-md font-bold text-wrap'>{location.name_en}</h2>
          <div className='flex gap-2'>
            <span className='inline-block'>
              <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                <CoinIcon className='w-4 h-4 text-white' />
                <span className='mt-1 ml-1 text-xs text-white'>
                  + {location.points}
                </span>
              </div>
            </span>
            <Link href={mapUrl} target='_blank' rel='noopener noreferrer'>
              <FaDirections className='w-6 h-6' fill='#FF1493' />
            </Link>
          </div>
        </div>
      </div>
      <p className='pl-4 mt-2 text-gray-500 text-xs text-wrap'>
        {location.description_en}
      </p>

      <div className='px-4 flex justify-between mt-4'>
        {/* <div className='flex items-center gap-1'>
                    <span className='text-sm text-gray-800 '>Added by</span>
                    <Image
                        src='/favicon.png' // replace with your avatar path
                        alt='Avatar'
                        width={16} // w-4 in Tailwind CSS is equivalent to 16px
                        height={16} // h-4 in Tailwind CSS is equivalent to 16px
                        className='rounded-full'
                    />
                </div> */}
        {/* <p className='text-xs text-gray-800'>1.4K check-in</p> */}
      </div>
      <div className='w-full mt-2'>
        <ItemButtonGroup location={location} />
      </div>
    </div>
  )
}

export default ItemCardList
