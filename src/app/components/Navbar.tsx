"use client"
import {CiMap, CiBoxList, CiGift} from "react-icons/ci"
import {RiAccountCircleLine} from "react-icons/ri"

export default function Navbar() {
    return (
        <div className='flex justify-around items-center py-4 bg-white shadow-md'>
            <div className='flex flex-col items-center text-muted-foreground hover:text-neonGreen'>
                <CiMap className='w-6 h-6' />
                <span>Main</span>
            </div>
            <div className='flex flex-col items-center text-muted-foreground hover:text-neonGreen'>
                <CiBoxList className='w-6 h-6' />
                <span>Map</span>
            </div>
            <div className='flex flex-col items-center text-muted-foreground hover:text-neonGreen'>
                <CiGift className='w-6 h-6' />
                <span>Day Plans</span>
            </div>
            <div className='flex flex-col items-center text-muted-foreground hover:text-neonGreen'>
                <RiAccountCircleLine className='w-6 h-6' />
                <span>Login</span>
            </div>
        </div>
    )
}
