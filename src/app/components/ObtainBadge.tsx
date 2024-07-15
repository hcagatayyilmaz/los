"use client"

import React, {useState} from "react"
import {obtainBadge} from "@/app/server/index"
import Image from "next/image"

type ObtainBadgeProps = {
    name: string
    description: string
    image: string
}

const ObtainBadge: React.FC<ObtainBadgeProps> = ({name, description, image}) => {
    const [message, setMessage] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [imageSrc, setImageSrc] = useState(image)

    const handleObtainBadge = async () => {
        try {
            const response = await obtainBadge({badgeId: "clyk4su0c00004qxzqb064tl8"})
            setMessage(response.message)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message)
            } else {
                setMessage("An unknown error occurred.")
            }
        }
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleImageError = () => {
        setImageSrc("/fallback-image.jpg") // Change to your fallback image path
    }

    return (
        <div className='flex flex-col items-center' onClick={toggleModal}>
            <div className='w-12 h-12 mb-2'>
                <Image
                    src={imageSrc}
                    alt='Badge Image'
                    width={48}
                    height={48}
                    className='rounded-full'
                    onError={handleImageError}
                />
            </div>
            <h2 className='text-lg font-bold text-center'>{name}</h2>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
                        <h2 className='text-lg font-bold mb-4'>{name}</h2>
                        <p className='text-gray-600 text-xs mb-4'>{description}</p>
                        <button
                            className='text-sm bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 w-full'
                            onClick={handleObtainBadge}
                        >
                            Obtain Badge
                        </button>
                        {message && <p className='text-green-600 mt-4'>{message}</p>}
                        <button
                            className='mt-4 text-sm text-gray-500 hover:text-gray-700'
                            onClick={toggleModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ObtainBadge
