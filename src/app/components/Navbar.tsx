"use client"
import {CiMap, CiBoxList, CiGift} from "react-icons/ci"
import {RiAccountCircleLine} from "react-icons/ri"
import {MapIcon, QuestIcon, RewardsIcon} from "../lib/CustomIcons"
import Link from "next/link"

export default function Navbar() {
    return (
        <div className='flex justify-around items-center py-2 px-2 bg-white shadow-md border-b-2 border-black'>
            <Link href={"/rewards"}>
                <div className='flex flex-col items-center text-muted-foreground hover:text-neonGreen'>
                    <MapIcon className='w-8 h-8 font-bold' />
                    <span>Map</span>
                </div>
            </Link>
            <div className='flex flex-col items-center text-muted-foreground hover:text-neonGreen'>
                <QuestIcon className='w-8 h-8' />
                <span>Quest</span>
            </div>
            <div className='flex flex-col items-center text-muted-foreground hover:text-neonGreen'>
                <RewardsIcon className='w-6 h-6' />
                <span>Rewards</span>
            </div>
            <div className='flex flex-col items-center text-muted-foreground hover:text-neonGreen'>
                <RiAccountCircleLine className='w-6 h-6' />
                <span>Login</span>
            </div>
        </div>
    )
}
