import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import Image from "next/image"

const museumModerno = MuseoModerno({
  subsets: ["latin"]
})

interface LogoProps {
  name?: string
  user?: any
  isMap?: boolean
}

export default function Header({name, user, isMap}: LogoProps) {
  return (
    <div
      className={`px-2  flex items-center justify-center bg-transparent   rounded-b-full`}
    >
      <Link href={"/"}>
        <div
          className={`flex items-center bg-white  rounded-b-full rounded-t-full px-4  text-center space-x-2 ${museumModerno.className}`}
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
  )
}
