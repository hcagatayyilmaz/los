"use client"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {CoinIcon} from "../lib/CustomIcons"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

interface LogoProps {
    name: string
    user: any
}

export default function Header({name, user}: LogoProps) {
    return (
        <div className={`px-2 mt-2 pb-4 flex items-center justify-center bg-transparent`}>
            <Link href={"/"}>
                <div
                    className={`flex items-end bg-white px-4 py-1 rounded-3xl space-x-2 ${museumModerno.className}`}
                >
                    <h1 className='text-3xl font-medium'>
                        <span className='text-black '>los</span>
                        <span className='text-customYellow text-4xl animate-ping opacity-7'>.</span>
                    </h1>
                    <div className='flex items-end justify-end'>
                        <h2 className='text-md font-semibold text-customYellow  top-3 -left-4'>
                            {name}
                        </h2>
                    </div>
                </div>
            </Link>

            {/* <div className='flex items-center justify-center bg-pink-100 text-customYellow rounded-full px-4'>
                <CoinIcon className={"text-customYellow"} />
                <span className='text-sm'>+40</span>
            </div> */}
        </div>
    )
}
