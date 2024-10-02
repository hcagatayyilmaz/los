"use client"
import {CiMap, CiBoxList, CiGift, CiLogin} from "react-icons/ci"
import {RiAccountCircleLine} from "react-icons/ri"
import {VscAccount} from "react-icons/vsc"
import {RiCoupon2Line} from "react-icons/ri"

import {MapIcon, QuestIcon, RewardsIcon} from "../lib/CustomIcons"
import Link from "next/link"
import {MdOutlineLeaderboard} from "react-icons/md"
import {usePathname} from "next/navigation"
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import {useUIContext} from "../providers/UIProvider"

// I am not sure whether should we have  color or not. TO BE DISCUSSED

export default function Navbar({
  sticky,
  slug
}: {
  sticky?: boolean
  slug: string
}) {
  const {setIsListView} = useUIContext()
  const currentPath = usePathname() // Get the current path
  const {isAuthenticated} = useKindeBrowserClient()

  return (
    <div
      className={
        sticky
          ? "fixed bottom-0 left-0 right-0 bg-white border-t pt-1"
          : "h-full w-full bg-white border-t pt-1"
      }
    >
      <div className='flex justify-around px-2 items-center bg-transparent text-sm'>
        <Link href={`/${slug}`} onClick={() => setIsListView(false)}>
          <div className='flex flex-col  items-center text-muted-foreground bg-white px-2 py-1 rounded  text-sm '>
            <CiMap className='w-5 h-5 ' />
            <span className='text-xs'>Map</span>
          </div>
        </Link>

        <Link href={`/${slug}/rewards`}>
          <div className='flex flex-col   items-center text-muted-foreground bg-white px-2 py-1 rounded  hover:text-customYellow  text-sm'>
            <img src='/coupon-code.png' alt='Rewards' className='w-5 h-5' />
            <span className='text-xs'>Rewards</span>
          </div>
        </Link>

        <Link href={`/${slug}/quests`}>
          <div className='flex flex-col   items-center text-muted-foreground bg-white px-2 py-1 rounded  hover:text-customYellow  text-sm'>
            <MapIcon className='w-5 h-5' />
            <span className='text-xs'>Quests</span>
          </div>
        </Link>
        {isAuthenticated ? (
          <LogoutLink>
            <div className='flex flex-col   items-center text-muted-foreground bg-white px-2 py-1 rounded  hover:text-customYellow  text-sm'>
              <VscAccount className='w-4 h-4' />
              <span className='text-xs'>Logout</span>
            </div>
          </LogoutLink>
        ) : (
          <LoginLink>
            <div className='flex flex-col  items-center text-muted-foreground bg-white px-2 py-1 rounded  hover:text-customYellow '>
              <VscAccount className='w-5 h-5 font-light' />
              <span className='text-xs'>Login</span>
            </div>
          </LoginLink>
        )}
      </div>
    </div>
  )
}
