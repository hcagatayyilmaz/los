import {NextResponse} from "next/server"
import {getPopQuiz} from "@/app/server/data"
import {submitQuiz} from "@/app/server/index"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({error: "Slug is required"}, {status: 400})
  }

  const quiz = await getPopQuiz({slug})
  return NextResponse.json(quiz)
}

export async function POST(request: Request) {
  const {quizId, submitted_answer} = await request.json()
  const result = await submitQuiz({quizId, submitted_answer})
  return NextResponse.json(result)
}
