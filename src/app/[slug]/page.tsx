import prisma from "@/app/lib/db"
import Header from "@/app/components/Header"
import Navbar from "@/app/components/Navbar"
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import Map from "@/app/components/Map"
import LocationPermissionButton from "@/app/components/LocationPermissionButton"

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
        title: city ? `Los. ${city.name}` : "City not found"
    }
}

export default async function CityPage({params}: CityPageParams) {
    const city = await prisma.city.findUnique({
        where: {
            slug: params.slug
        }
    })
    console.log(city)
    if (!city) {
        return (
            <main className='h-screen w-screen flex items-center justify-center'>
                <h1 className='text-4xl'>City not found</h1>
            </main>
        )
    }

    const {getUser} = getKindeServerSession()
    const user = await getUser()
    console.log(user)

    return (
        <main className='h-screen w-screen'>
            <Header user={user} name={city.name} />
            <Navbar />
            {user ? (
                <div className='flex flex-col justify-center items-center'>
                    <p>Welcome, {user.given_name}!</p>
                    <LogoutLink>Logout</LogoutLink>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <LoginLink>Log in</LoginLink>
                    <RegisterLink>Register</RegisterLink>
                </div>
            )}
            <div className='text-center mt-4'>
                <LocationPermissionButton />
            </div>
            <Map />
        </main>
    )
}
