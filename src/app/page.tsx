import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"

export default async function Home() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    return (
        <main className='h-screen w-screen'>
            <h1 className='text-center'>Los - MVP Development</h1>
        </main>
    )
}
