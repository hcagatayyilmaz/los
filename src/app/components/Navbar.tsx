"use client"
import {FaHome, FaMap, FaArrowUp, FaUser} from "react-icons/fa"

export default function Navbar() {
    return (
        <div className='flex justify-around items-center py-4 bg-white shadow-md'>
            <div className='flex flex-col items-center text-muted-foreground'>
                <FaHome className='w-6 h-6' />
                <span>Main</span>
            </div>
            <div className='flex flex-col items-center text-muted-foreground'>
                <FaMap className='w-6 h-6' />
                <span>Map</span>
            </div>
            <div className='relative flex flex-col items-center text-green-700'>
                <FaArrowUp className='w-6 h-6' />
                <span>Day Plans</span>
                <div className='absolute -top-3 -right-3 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center'>
                    C
                </div>
            </div>
            <div className='flex flex-col items-center text-muted-foreground'>
                <FaUser className='w-6 h-6' />
                <span>Login</span>
            </div>
        </div>
    )
}
