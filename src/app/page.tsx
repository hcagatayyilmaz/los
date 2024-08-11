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
        <main className='h-screen w-screen flex flex-col items-center'>
            <div className='w-full max-w-md px-4 bg-white flex justify-between border-b border-black'>
                <div
                    className={`flex items-center bg-white py-1 rounded-3xl text-center space-x-2 ${museoModerno.className}`}
                >
                    <h1 className='text-4xl flex items-end font-normal text-center'>
                        <span className={`text-black ${museoModerno.className} font-bold`}>
                            Los
                        </span>
                        <div className='ml-[2px] mb-2'>
                            <Image src='/logo.png' alt='Logo' width={12} height={12} />
                        </div>
                    </h1>
                    <div className='flex items-end justify-end mt-2'></div>
                </div>
                <div className='flex items-center gap-2'>
                    <Link href={"/partnership"}>
                        <button className='bg-black text-white px-2 rounded'>Partnership</button>
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
                        <span className='inline-block ml-1 h-3 w-3 rounded-full bg-customYellow'></span>
                    </div>
                    <div>
                        <span className={`${museoModerno.className} text-4xl font-bold`}>
                            Collect
                        </span>
                        <span> the points</span>
                        <span className='inline-block ml-1 h-3 w-3 rounded-full bg-customYellow'></span>
                    </div>
                    <div>
                        <span className={`${museoModerno.className} text-4xl font-bold`}>Win</span>
                        <span> the rewards</span>
                        <span className='inline-block ml-1 h-3 w-3 rounded-full bg-customYellow border'></span>
                    </div>
                </div>
                <h2 className='mt-4 overflow-hidden md:overflow-auto whitespace-normal text-16 xl:text-28'>
                    Experience the world
                    <span className='hidden md:contents'></span> with, gamified guides offering
                    exciting rewards.
                </h2>
                <div className='h-[30vh] w-full my-6 rounded-lg'>
                    <ImageSlider />
                </div>
                <div className='my-4'>
                    <Link href={"/tuebingen"}>
                        <button
                            className={`${museoModerno.className} bg-blue-500 rounded-full text-white font-medium py-1 text-sm px-4 mb-2 border w-full`}
                        >
                            App
                        </button>
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-4 '>
                    <Link href={"/tuebingen"}>
                        <button
                            className={`${museoModerno.className} bg-customYellow rounded-full text-white font-medium py-1 text-sm px-4 mb-2 border w-full`}
                        >
                            Tübingen
                        </button>
                    </Link>
                    <div
                        className={`${museoModerno.className} bg-[#39FF14] rounded-full text-black font-medium py-1 px-4 text-sm mb-2 border relative w-full`}
                    >
                        Berlin
                        <span className='absolute -top-2 right-0 text-xs bg-white text-black px-2 py-0.5 rounded-full border border-[#39FF14]'>
                            soon
                        </span>
                    </div>
                    <div
                        className={`${museoModerno.className} bg-white rounded-full text-black font-medium py-1 px-4 text-sm mb-2 border relative w-full border-black`}
                    >
                        München
                        <span className='absolute -top-2 right-0 text-xs bg-white text-black px-2 py-0.5 rounded-full border border-black'>
                            soon
                        </span>
                    </div>
                    <div
                        className={`${museoModerno.className} bg-black rounded-full text-white font-medium py-1 px-4 text-sm mb-2 border relative w-full`}
                    >
                        Stuttgart
                        <span className='absolute -top-2 right-0 text-xs bg-white text-black px-2 py-0.5 rounded-full border border-black'>
                            soon
                        </span>
                    </div>
                </div>
            </div>
            <div className='py-2 bg-white border-t border-black px-2 flex justify-end gap-x-2 items-center'>
                <a
                    href='mailto:tuebingen@los.city'
                    className='border-2 rounded border-black px-2 cursor-pointer'
                >
                    Contact
                </a>
                <Link href='/privacy'>
                    <button className='border-2 rounded border-black px-2 cursor-pointer'>
                        Privacy
                    </button>
                </Link>
            </div>
        </main>
    )
}
