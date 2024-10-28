"use client"
import {CiMap, CiBoxList, CiGift, CiLogin} from "react-icons/ci"
import {RiAccountCircleLine} from "react-icons/ri"
import {VscAccount} from "react-icons/vsc"
import {RiCoupon2Line} from "react-icons/ri"
import Header from "./Header"
import {MapIcon, QuestIcon, RewardsIcon} from "../lib/CustomIcons"
import Link from "next/link"
import {MdOutlineLeaderboard} from "react-icons/md"
import {usePathname} from "next/navigation"
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import {useUIContext} from "../providers/UIProvider"

// I am not sure whether should we have  color or not. TO BE DISCUSSED

type NavbarProps = {
  isHidden?: boolean
  slug: string
}

export default function Navbar({isHidden, slug}: NavbarProps) {
  const {setIsListView, isListView} = useUIContext()
  const currentPath = usePathname() // Get the current path
  const {isAuthenticated} = useKindeBrowserClient()

  return (
    <div
      className={
        isListView ? "hidden" : "h-full w-full bg-white border-t pt-1 border"
      }
    >
      <div className='flex justify-around px-2 items-center bg-transparent text-sm '>
        <Link href={`/${slug}`} onClick={() => setIsListView(false)}>
          <div className='flex flex-col  items-center text-muted-foreground bg-white px-2 py-1 rounded  text-sm '>
            <CiMap className='w-4 h-4 ' />
            <span className='text-xs'>Map</span>
          </div>
        </Link>

        <Link href={`/${slug}/rewards`}>
          <div className='flex flex-col   items-center text-muted-foreground bg-white px-2 py-1 rounded  hover:text-customYellow  text-sm'>
            <img src='/coupon-code.png' alt='Rewards' className='w-4 h-4' />
            <span className='text-xs'>Rewards</span>
          </div>
        </Link>

        <Header name={slug} />

        <Link href={`/${slug}/quests`}>
          <div className='flex flex-col   items-center text-muted-foreground bg-white px-2 py-1 rounded  hover:text-customYellow  text-sm'>
            <MapIcon className='w-4 h-4' />
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
              <VscAccount className='w-4 h-4 font-light' />
              <span className='text-xs'>Login</span>
            </div>
          </LoginLink>
        )}
      </div>
    </div>
  )
}
