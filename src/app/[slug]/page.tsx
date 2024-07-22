// src/app/[slug]/page.tsx
import prisma from "@/app/lib/db"
import Header from "@/app/components/Header"
import Navbar from "@/app/components/Navbar"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import Map from "@/app/components/Map"
import ItemsSlider from "@/app/components/ItemSlider"
import {LocationProvider} from "@/app/providers/useSelectedItem"
import {getAttractions} from "@/app/server/data"
import toast from "react-hot-toast"
import {unstable_noStore} from "next/cache"
import LocationPermissionButton from "../components/LocationPermissionButton"
import TotalPoints from "../components/TotalPoints"
import ClosestPlace from "../components/ClosestPlace"
import ActionsButtons from "../components/ActionsButtons"

type CityPageParams = {
    params: {
        slug: string
    }
    searchParams?: {[key: string]: string | string[] | undefined} | undefined
}

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
        console.log("City:", city)

        if (!city) {
            return (
                <main className='h-dvh w-screen flex items-center justify-center'>
                    <h1 className='text-4xl'>City not found</h1>
                </main>
            )
        }

        const filter = searchParams && {
            date: searchParams.date,
            taxonomy: searchParams.taxonomy
        }

        console.log("Filter:", filter)

        const attractions = await getAttractions(city.id, filter)
        const {getUser} = getKindeServerSession()
        const user = await getUser()
        console.log(user)

        return (
            <LocationProvider initialLocation={attractions[0]}>
                <main className='h-dvh w-screen relative'>
                    <div className='absolute top-0 left-0 h-full w-full pointer-events-none'>
                        <div className='h-full w-full pointer-events-auto '>
                            <Map locations={attractions} />
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 w-full z-20 bg-transparent'>
                        <Header user={user} name={city.name} />
                        <Navbar />
                        <ActionsButtons slug={city.slug} />
                    </div>
                    <div className='absolute bottom-0 left-0 w-full z-20'>
                        <div className='flex mx-4 mb-1 justify-between '>
                            {user ? (
                                <TotalPoints points={user.points} />
                            ) : (
                                <TotalPoints points={0} />
                            )}
                            <div className='flex gap-1'>
                                <ClosestPlace />
                                <LocationPermissionButton />
                            </div>
                        </div>
                        <ItemsSlider locations={attractions} />
                    </div>
                </main>
            </LocationProvider>
        )
    } catch (error) {
        console.error(error)
        return (
            <main className='h-screen w-screen flex items-center justify-center'>
                <h1 className='text-4xl'>An error occurred</h1>
            </main>
        )
    }
}

export default CityPage
