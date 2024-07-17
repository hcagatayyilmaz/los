import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {MuseoModerno} from "next/font/google"
import ImageSlider from "./components/ImageSlider"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"]

export default async function Home() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const language = "EN"

    return (
        <main className='h-dvh w-dvw flex flex-col'>
            <div className='px-4 bg-white h-10 flex justify-between border-b border-black'>
                <div
                    className={`flex items-center bg-white py-1 rounded-3xl text-center space-x-2  ${museumModerno.className}`}
                >
                    <h1 className='text-3xl flex items-end font-normal text-center'>
                        <span className={`text-black ${museumModerno.className} font-bold`}>
                            Los
                        </span>
                        <div className='w-3 h-3 border-2 border-customYellow rounded-full ml-1 mb-2'></div>
                    </h1>
                    <div className='flex items-end justify-end mt-2'></div>
                </div>
                <div className='flex items-center'>
                    <button className='text-sm font-medium text-gray-700 focus:outline-none'>
                        {language === "EN" ? "EN | DE" : "DE | EN"}
                    </button>
                </div>
            </div>
            <div className='px-4 pt-8 h-full '>
                <div className=' text-4xl flex flex-col gap-4 font-light'>
                    <p>
                        <span className={`${museumModerno.className} text-4xl font-bold `}>
                            Explore
                        </span>
                        <span> </span>the city<span className='text-customYellow text-10xl'>.</span>
                    </p>
                    <p>
                        <span className={`${museumModerno.className} text-4xl font-bold `}>
                            Collect
                        </span>
                        <span> </span>the points
                        <span className='text-customYellow text-10xl'>.</span>
                    </p>
                    <p>
                        <span className={`${museumModerno.className} text-4xl font-bold `}>
                            Win
                        </span>
                        <span></span> the rewards
                        <span className='text-customYellow text-10xl'>.</span>
                    </p>
                </div>
                <h2 className='mt-4 overflow-hidden md:overflow-auto md:whitespace-nowrap text-16 whitespace-normal xl:text-28'>
                    Since life in cities can be both exciting and overwhelming
                    <span className='hidden md:contents'></span> we publish the world’s most
                    engaging guides to city life.
                </h2>
                <div className='h-[30vh] w-full my-6 rounded-lg'>
                    <ImageSlider />
                </div>
                <div className=' flex flex-wrap px-2 p-2 gap-x-4'>
                    <div className='border-2 bg-white rounded-full border-black text-customYellow font-medium py-1 text-sm px-4 inline-block mb-2'>
                        TÜBINGEN
                    </div>
                    <div className='border-2 bg-white rounded-full border-black text-green-500 font-medium py-1 px-4 text-sm inline-block mb-2'>
                        STUTTGART
                    </div>
                    <div className='border-2 bg-white rounded-full border-black text-yellow-500 font-medium py-1 px-4 text-sm inline-block mb-2'>
                        MÜNCHEN
                    </div>
                </div>
            </div>
            <div className='h-[12vh] py-1 bg-white border-t border-black px-2 flex justify-end gap-x-2 items-center'>
                <div className='border-2 rounded border-black px-2'>Privacy</div>
                <div className='border-2 rounded border-black px-2'>Contact</div>
            </div>
        </main>
    )
}
