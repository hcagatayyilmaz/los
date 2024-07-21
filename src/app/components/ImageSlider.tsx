"use client"
import React, {useState, useEffect} from "react"
import Image from "next/image"

const images = ["/image1.webp", "/image2.webp"]

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 3000) // Change image every 3 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='relative h-full w-full rounded-lg'>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={image}
                        alt={`Slide ${index}`}
                        layout='fill'
                        objectFit='cover'
                        className='w-full h-full rounded-lg'
                    />
                </div>
            ))}
        </div>
    )
}

export default ImageSlider
