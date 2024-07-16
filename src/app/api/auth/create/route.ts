import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "@/app/lib/db"
import {NextResponse} from "next/server"
import {unstable_noStore as noStore} from "next/cache"

export async function GET() {
    noStore()
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) {
        throw new Error("Something went wrong!")
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                id: user.id,
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
        })
    }

    const redirectUrl = process.env.KINDE_POST_LOGOUT_REDIRECT_URL
    if (!redirectUrl) {
        throw new Error("KINDE_POST_LOGOUT_REDIRECT_URL is not defined")
    }

    return NextResponse.redirect(redirectUrl)
}
