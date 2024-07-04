import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components"

export default function Home() {
    return (
        <main>
            <h1>Los MVP Development</h1>
            <div className='flex flex-col'>
                <LoginLink>Sign in</LoginLink>
                <RegisterLink>Sign up</RegisterLink>
            </div>
        </main>
    )
}
