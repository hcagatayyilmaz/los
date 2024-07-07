import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components"
import Map from "./components/Map"
import LocationPermissionButton from "./components/LocationPermissionButton"

export default function Home() {
    return (
        <main className='h-screen w-screen'>
            <h1 className='text-center'>Los - MVP Development</h1>
            <div className='flex flex-col justify-center items-center'>
                <LoginLink>Sign in</LoginLink>
                <RegisterLink>Register</RegisterLink>
            </div>

            <div className='text-center mt-4'>
                <LocationPermissionButton />
            </div>

            <Map />
        </main>
    )
}
