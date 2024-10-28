import {NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  {params}: {params: {slug: string}}
) {
  const {slug} = params

  try {
    const city = await prisma.city.findUnique({
      where: {slug},
      include: {
        attractions: true
      }
    })

    if (!city) {
      return NextResponse.json({error: "City not found"}, {status: 404})
    }

    return NextResponse.json(city.attractions)
  } catch (error) {
    console.error("Error fetching attractions:", error)
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
}
