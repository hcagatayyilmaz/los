// src/app/[slug]/page.tsx
import prisma from "@/app/lib/db"
import Header from "@/app/components/Header"
import Navbar from "@/app/components/Navbar"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {SelectedItemProvider} from "@/app/providers/useSelectedItem"
import {getAllPlaces, getDBUser} from "@/app/server/data"
import LocationPermissionButton from "../components/LocationPermissionButton"
import TotalPoints from "../components/TotalPoints"
import ActionsButtons from "../components/ActionsButtons"
import {UIProvider} from "@/app/providers/UIProvider"
import Map from "../components/Map"
import MapItemWrapper from "../components/MapItemWrapper"
import Banner from "../components/Banner"
import {redirect} from "next/navigation"

type MapPageParams = {
  params: {
    slug: string
  }
  searchParams?: {[key: string]: string | string[] | undefined} | undefined
}

export const revalidate = 3600

const MapPage = async ({searchParams}: MapPageParams) => {
  const filter = searchParams && {
    date: searchParams.date,
    taxonomy: searchParams.taxonomy
  }

  const attractions = await getAllPlaces()
  const {getUser} = getKindeServerSession()

  const kindeUser = await getUser()
  const user = kindeUser ? await getDBUser(kindeUser.id) : null
  if (!user) {
    // Redirect to Kinde login page
    redirect("/api/auth/login")
  }
  return (
    <UIProvider>
      <SelectedItemProvider initialLocation={attractions[0]}>
        <main className='h-dvh w-full max-w-md mx-auto relative'>
          <div className='absolute inset-0 pointer-events-none'>
            <div className='h-full w-full pointer-events-auto'>
              <Map locations={attractions} isMapPage={true} />
            </div>
          </div>
          <Banner />
          <div className='absolute top-0 left-0 w-full z-20 bg-transparent'>
            <Header user={user} isMap={true} />
            <Navbar isMapPage={true} />
            <ActionsButtons slug={"map"} />
            {/* <Banner /> */}
          </div>
          <div className='absolute bottom-0 left-0 w-full z-1'>
            <div className='flex mx-4 mb-1 justify-between items-center'>
              <TotalPoints points={user ? user.points : 0} />
              <div className='flex gap-1'>
                <LocationPermissionButton />
              </div>
            </div>
            <MapItemWrapper />
          </div>
        </main>
      </SelectedItemProvider>
    </UIProvider>
  )
}

export default MapPage
