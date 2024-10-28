import {use, Suspense} from "react"
import {notFound} from "next/navigation"
import prisma from "@/app/lib/db"
import Header from "@/app/components/Header"
import Navbar from "@/app/components/Navbar"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import Banner from "@/app/components/Banner"
import CardButtonWrapper from "../components/CardButtonWrapper"
import {SelectedItemProvider} from "@/app/providers/useSelectedItem"
import {getAttractions, getDBUser} from "@/app/server/data"
import {UIProvider} from "@/app/providers/UIProvider"
import MainLayout from "../components/MainLayout"
import MapItemWrapper from "../components/MapItemWrapper"
import ActionsButtons from "../components/ActionsButtons"

type CityPageParams = {
  params: {
    slug: string
  }
  searchParams?: {[key: string]: string | string[] | undefined}
}

export async function generateStaticParams() {
  const cities = await prisma.city.findMany()
  return cities.map((city) => ({
    slug: city.slug
  }))
}

async function getCityData(slug: string, searchParams: any) {
  const city = await prisma.city.findUnique({where: {slug}})
  if (!city) notFound()

  const filter = searchParams && {
    date: searchParams.date,
    taxonomy: searchParams.taxonomy
  }

  const {attractions, syntheticData} = await getAttractions(city.id, filter)
  return {city, attractions, syntheticData}
}

async function getUserData() {
  const {getUser} = getKindeServerSession()
  const kindeUser = await getUser()
  return kindeUser ? await getDBUser(kindeUser.id) : null
}

export default function CityPage({params, searchParams}: CityPageParams) {
  const cityDataPromise = getCityData(params.slug, searchParams)
  const userDataPromise = getUserData()

  return (
    <CityPageContent
      cityDataPromise={cityDataPromise}
      userDataPromise={userDataPromise}
    />
  )
}

function CityPageContent({
  cityDataPromise,
  userDataPromise
}: {
  cityDataPromise: ReturnType<typeof getCityData>
  userDataPromise: ReturnType<typeof getUserData>
}) {
  const {city, attractions, syntheticData} = use(cityDataPromise)
  const user = use(userDataPromise)

  return (
    <UIProvider>
      <SelectedItemProvider initialLocation={attractions[0]}>
        <main className='h-dvh w-full max-w-md mx-auto relative'>
          <div className='absolute inset-0 pointer-events-none'>
            <div className='h-full w-full pointer-events-auto'>
              <MainLayout
                locations={attractions}
                syntheticData={syntheticData}
                cityCenter={{
                  lat: city.centerLat ?? 48.520770613433,
                  lng: city.centerLng ?? 9.057862627849184
                }}
              />
            </div>
          </div>
          <Banner />
          <div className='absolute top-0 left-0 w-full z-20 bg-transparent'>
            {/* <Header user={user} name={city.name} /> */}
            <ActionsButtons slug={city.slug} />
          </div>
          <div className='absolute bottom-0 left-0 w-full z-10 flex flex-col'>
            <div className='flex-grow overflow-y-auto'>
              <CardButtonWrapper
                points={user ? user.points : 0}
                location={attractions[0]}
              />
              <MapItemWrapper />
            </div>
            <div className='sticky bottom-0 w-full'>
              <Navbar slug={city.slug} />
            </div>
          </div>
        </main>
      </SelectedItemProvider>
    </UIProvider>
  )
}

export const revalidate = 3600 // revalidate every hour
