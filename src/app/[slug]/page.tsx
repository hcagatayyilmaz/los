// src/app/[slug]/page.tsx
import prisma from "@/app/lib/db"
import Header from "@/app/components/Header"
import Navbar from "@/app/components/Navbar"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"

import CardButtonWrapper from "../components/CardButtonWrapper"

import {SelectedItemProvider} from "@/app/providers/useSelectedItem"
import {getAttractions, getDBUser} from "@/app/server/data"
import {unstable_noStore} from "next/cache"
import LocationPermissionButton from "../components/LocationPermissionButton"
import TotalPoints from "../components/TotalPoints"
import ActionsButtons from "../components/ActionsButtons"
import ClosestPlace from "../components/ClosestPlace"
import {UIProvider} from "@/app/providers/UIProvider" // Ensure this is the correct path
import MainLayout from "../components/MainLayout"
import SliderWrapper from "../components/SliderWrapper"

type CityPageParams = {
  params: {
    slug: string
  }
  searchParams?: {[key: string]: string | string[] | undefined} | undefined
}

export const revalidate = 3600

export async function generateStaticParams() {
  unstable_noStore()
  const cities = await prisma.city.findMany()
  return cities.map((city) => ({
    slug: city.slug
  }))
}

export async function generateMetadata({params}: CityPageParams) {
  unstable_noStore()
  const city = await prisma.city.findUnique({
    where: {
      slug: params.slug
    }
  })
  return {
    title: city ? `Los - ${city.name}` : "City not found"
  }
}

const CityPage = async ({params, searchParams}: CityPageParams) => {
  try {
    const city = await prisma.city.findUnique({
      where: {
        slug: params.slug
      }
    })

    if (!city) {
      return (
        <main className='h-screen w-screen flex items-center justify-center'>
          <h1 className='text-4xl'>City not found</h1>
        </main>
      )
    }

    const filter = searchParams && {
      date: searchParams.date,
      taxonomy: searchParams.taxonomy
    }

    const attractions = await getAttractions(city.id, filter)
    const {getUser} = getKindeServerSession()

    const kindeUser = await getUser()
    const user = kindeUser ? await getDBUser(kindeUser.id) : null

    return (
      <UIProvider>
        <SelectedItemProvider initialLocation={attractions[0]}>
          <main className='h-dvh w-full max-w-md mx-auto relative'>
            <div className='absolute inset-0 pointer-events-none'>
              <div className='h-full w-full pointer-events-auto'>
                <MainLayout locations={attractions} />
              </div>
            </div>
            <div className='absolute top-0 left-0 w-full z-20 bg-transparent'>
              <Header user={user} name={city.name} />
              <Navbar />
              <ActionsButtons slug={city.slug} />
              {/* <Banner /> */}
            </div>
            <div className='absolute bottom-0 left-0 w-full z-1'>
              <CardButtonWrapper
                points={user ? user.points : 0}
                locations={attractions}
              />
              <SliderWrapper locations={attractions} />
            </div>
          </main>
        </SelectedItemProvider>
      </UIProvider>
    )
  } catch (error) {
    console.error(error)
    return (
      <main className='h-dvh w-screen flex items-center justify-center'>
        <h1 className='text-4xl'>An error occurred</h1>
      </main>
    )
  }
}

export default CityPage
