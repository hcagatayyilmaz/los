import prisma from "@/app/lib/db"
import Header from "@/app/components/Header"
import Navbar from "@/app/components/Navbar"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import Map from "@/app/components/Map"
import ItemsSlider from "../components/ItemSlider"
import {LocationProvider} from "../providers/useSelectedItem"
import {mockLocations as locations} from "../lib/data"
import {Location} from "../lib/types"

type CityPageParams = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const cities = await prisma.city.findMany()
    return cities.map((city) => ({
        slug: city.slug
    }))
}

export async function generateMetadata({params}: CityPageParams) {
    const city = await prisma.city.findUnique({
        where: {
            slug: params.slug
        }
    })
    return {
        title: city ? `Los - ${city.name}` : "City not found"
    }
}

export default async function CityPage({params}: CityPageParams) {
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

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    return (
        <LocationProvider initialLocation={locations[0]}>
            <main className='h-screen w-screen flex flex-col relative'>
                <div className='absolute top-0 left-0 h-full w-full z-0'>
                    <Map locations={locations} />
                </div>
                <div className='relative z-10 flex-grow'>
                    <Header user={user} name={city.name} />
                    <Navbar />
                </div>
                <div className='relative z-10'>
                    <ItemsSlider locations={locations} />
                </div>
            </main>
        </LocationProvider>
    )
}
