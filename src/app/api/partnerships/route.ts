import {NextResponse} from "next/server"
import {applyForPartnership} from "@/app/server/index"

export async function POST(request: Request) {
  const {name, description, amount, email} = await request.json()
  const result = await applyForPartnership({name, description, amount, email})
  return NextResponse.json(result)
}
