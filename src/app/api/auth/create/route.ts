import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "@/app/lib/db"
import {NextResponse} from "next/server"
import {unstable_noStore as noStore} from "next/cache"

export async function GET() {
    noStore()
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if (!user || user === null || !user.id) {
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
                email: (user.email as string) ?? "",
                firstName: (user.given_name as string) ?? "",
                lastName: (user.family_name as string) ?? "",
                id: user.id,
                profileImage:
                    (user.picture as string) ?? `https://avatar.vercel.sh/${user.given_name}`
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000")
}
