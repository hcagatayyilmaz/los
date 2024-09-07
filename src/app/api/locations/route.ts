import {NextResponse} from "next/server"
import {addLocation} from "@/app/server/index"

export async function POST(request: Request) {
  const {description, taxonomy, latitude, longitude, address, name} =
    await request.json()
  const result = await addLocation({
    description,
    taxonomy,
    latitude,
    longitude,
    address,
    name
  })
  return NextResponse.json(result)
}
