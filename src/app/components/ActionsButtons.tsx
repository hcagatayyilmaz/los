"use client"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {FilterIcon} from "../lib/CustomIcons"
import Image from "next/image"

interface ActionsButtonsProps {
    slug: string
}

const ActionsButtons: React.FC<ActionsButtonsProps> = ({slug}) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleFilterClick = (filter: string) => {
        router.push(`/${slug}?filter=${filter}`)
        setIsOpen(false)
    }

    const handleAddPlaceClick = () => {
        router.push(`/${slug}/quests#add-new-place`)
    }

    return (
        <div className='w-full flex mt-2 items-center justify-between'>
            <div className='relative inline-block text-left'>
                <div
                    className='flex gap-2 bg-white px-2 py-1 items-center rounded-full cursor-pointer border shadow-lg'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FilterIcon width={20} height={20} />
                    <span>Filter</span>
                </div>
                {isOpen && (
                    <div className='origin-top-left absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none font-bold text-black'>
                        <div
                            className='py-1'
                            role='menu'
                            aria-orientation='vertical'
                            aria-labelledby='options-menu'
                        >
                            <button
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'
                                role='menuitem'
                                onClick={() => handleFilterClick("all")}
                            >
                                All
                            </button>
                            <button
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'
                                role='menuitem'
                                onClick={() => handleFilterClick("attractions")}
                            >
                                Attractions
                            </button>
                            <button
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'
                                role='menuitem'
                                onClick={() => handleFilterClick("events")}
                            >
                                Events
                            </button>
                            <button
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'
                                role='menuitem'
                                onClick={() => handleFilterClick("experiences")}
                            >
                                Experiences
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div
                className=' bg-white px-2 py-1 rounded-full flex items-center border shadow-md cursor-pointer'
                onClick={handleAddPlaceClick}
            >
                <Image src={"/logo.png"} width={24} height={24} alt='Logo Icon' />
                <span className='ml-1'>Add Place</span>
            </div>
        </div>
    )
}

export default ActionsButtons
