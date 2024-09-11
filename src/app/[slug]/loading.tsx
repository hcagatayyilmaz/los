"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import {MuseoModerno} from "next/font/google"

const museumModerno = MuseoModerno({
  subsets: ["latin"]
})

const SlugFallback: React.FC = () => {
  console.log("SlugFallback rendering")

  return (
    <>
      <div className='max-w-xl mx-auto bg-transparent font-sans border'>
        <div
          className={`px-2  flex items-center justify-center bg-white border  -xl  rounded-b-full`}
        >
          <Link href={"/"}>
            <div
              className={`flex items-center bg-white px-4  text-center space-x-2 ${museumModerno.className}`}
              style={{border: "1px dashed white"}}
            >
              <div className='relative'>
                <Image
                  src='/logo-text-2.png'
                  alt='Los'
                  width={80}
                  height={60}
                  className={`text-black ${museumModerno.className}`}
                />
                <div className='absolute top-0 -right-8 bg-[#2cff05] text-black px-2 py-1 text-[8px] rounded-full'>
                  BETA
                </div>
              </div>
              <div className='flex items-end justify-end mt-2'>
                {/* {!isMap && (
              <h2 className='text-md font-semibold text-customYellow'>
                {name}
              </h2>
            )} */}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className='w-screen h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full h-full relative overflow-hidden rounded-lg bg-white shadow-lg'>
          <div className='absolute inset-0 bg-gradient-to-br from-pink-500/30 to-transparent animate-pulse' />
          <div className='absolute top-0 left-0 w-full h-0.5 bg-customYellow animate-scan' />
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className='absolute w-2 h-2 bg-pink-400 rounded-full animate-twinkle border-black border'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
          <div className='absolute inset-0 flex items-center justify-center'></div>
        </div>
        <style jsx>{`
          @keyframes scan {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(20rem);
            }
          }
          .animate-scan {
            animation: scan 5s linear infinite;
          }
          @keyframes twinkle {
            0%,
            100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  )
}

export default SlugFallback
