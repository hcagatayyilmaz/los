import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {MuseoModerno} from "next/font/google"
import ImageSlider from "./components/ImageSlider"
import Link from "next/link"
import Image from "next/image"

const museoModerno = MuseoModerno({
  subsets: ["latin"]
})

export default async function Home() {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const language = "EN"

  return (
    <main className='min-h-dvh w-screen flex flex-col items-center'>
      <div className='w-full max-w-md px-4 bg-white flex justify-between border-b border-black'>
        <div
          className={`flex items-center bg-white py-1 rounded-3xl text-center space-x-2 ${museoModerno.className}`}
        >
          <div className='relative'>
            <Image
              src='/logo-text-2.png'
              alt='Los'
              width={100}
              height={80}
              className={`text-black ${museoModerno.className}`}
            />
            <div className='absolute top-0 -right-8 bg-[#2cff05] text-black px-2 py-1 text-[8px] rounded-full'>
              BETA
            </div>
          </div>
          <div className='flex items-end justify-end mt-2'></div>
        </div>
        <div className='flex items-center gap-2'>
          <Link href={"/partnership"}>
            <button className='bg-black text-white px-2 rounded'>
              Partnership
            </button>
          </Link>
          <button className='text-sm font-medium text-gray-700 focus:outline-none'>
            {language === "EN" ? "EN | DE" : "DE | EN"}
          </button>
        </div>
      </div>
      <div className='w-full max-w-md px-4 pt-8 h-full'>
        <div className='text-4xl flex flex-col gap-4 font-light'>
          <div>
            <span className={`${museoModerno.className} text-4xl font-bold`}>
              Explore
            </span>
            <span> the city</span>
            <Image
              src='/logo.png'
              alt='Logo'
              width={12}
              height={12}
              className='inline-block ml-1'
            />
          </div>
          <div>
            <span className={`${museoModerno.className} text-4xl font-bold`}>
              Collect
            </span>
            <span> the points</span>
            <Image
              src='/logo.png'
              alt='Logo'
              width={12}
              height={12}
              className='inline-block ml-1'
            />
          </div>
          <div>
            <span className={`${museoModerno.className} text-4xl font-bold`}>
              Win
            </span>
            <span> the rewards</span>
            <Image
              src='/logo.png'
              alt='Logo'
              width={12}
              height={12}
              className='inline-block ml-1'
            />
          </div>
        </div>
        <h2
          className={`mt-4 overflow-hidden md:overflow-auto whitespace-normal text-16 xl:text-28 ${museoModerno.className}`}
        >
          Find the coolest experiences and explore the cities
          <span className='hidden md:contents'></span> with gamified experiences
          offering exciting rewards.
        </h2>
        <div className='h-[30vh] w-full my-6 rounded-lg'>
          <ImageSlider />
        </div>
        <div className=''>
          {/* <Link href={"/map"}>
            <button
              className={`${museoModerno.className} bg-customYellow text-xl rounded-full text-white font-medium py-3 px-4 mb-2 border w-full`}
            >
              MAP
            </button>
          </Link> */}
        </div>
        <div className='py-4'>
          <h1 className={`${museoModerno.className} text-4xl font-medium`}>
            Los Cities
          </h1>
        </div>
        <div className='grid grid-cols-2 gap-2 '>
          <Link href={"/tuebingen"}>
            <button
              className={`${museoModerno.className} rounded-full bg-white text-black font-medium py-1 text-sm px-4 mb-2 border w-full border-black`}
            >
              Tübingen
            </button>
          </Link>
          <button
            className={`${museoModerno.className} rounded-full bg-white text-black font-medium py-1 text-sm px-4 mb-2 border w-full border-black`}
          >
            Berlin
          </button>
          <button
            className={`${museoModerno.className} rounded-full bg-white text-black font-medium py-1 text-sm px-4 mb-2 border w-full border-black`}
          >
            Hamburg
          </button>
          <button
            className={`${museoModerno.className} rounded-full bg-white text-black font-medium py-1 text-sm px-4 mb-2 border w-full border-black`}
          >
            Münich
          </button>
          <button
            className={`${museoModerno.className} rounded-full bg-white text-black font-medium py-1 text-sm px-4 mb-2 border w-full border-black`}
          >
            Stuttgart
          </button>
          <button
            className={`${museoModerno.className} rounded-full bg-white text-black font-medium py-1 text-sm px-4 mb-2 border w-full border-black`}
          >
            New York
          </button>
        </div>
      </div>

      <div className='py-2  mt-4 w-full max-w-md bg-black text-white border-black px-3 flex justify-between items-center'>
        <a
          href='mailto:support@los.city'
          className='border-2 rounded border-black px-2 cursor-pointer'
        >
          Contact
        </a>
        <Link href='/terms'>
          <button className='border-2 rounded border-black px-2 cursor-pointer'>
            Terms of use
          </button>
        </Link>
        <Link href='/privacy'>
          <button className='border-2 rounded border-black px-2 cursor-pointer'>
            Privacy
          </button>
        </Link>
      </div>
    </main>
  )
}
