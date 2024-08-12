"use client"
import Link from "next/link"
import React, {useState} from "react"
import Image from "next/image"
import {MuseoModerno} from "next/font/google"
import {useRouter} from "next/navigation"
import {applyForPartnership} from "@/app/server/index"
import {toast} from "react-hot-toast"
import CustomToast from "@/app/components/CustomToast"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

const Partnership: React.FC = () => {
    const [email, setEmail] = useState("")
    const [placeName, setPlaceName] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [language, setLanguage] = useState("EN")
    const [showForm, setShowForm] = useState(false)
    const [showAskForm, setShowAskForm] = useState(false)
    const [askEmail, setAskEmail] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await applyForPartnership({
                name: placeName,
                description,
                amount: amount,
                email
            })
            toast.custom(
                <CustomToast
                    message='Partnership application submitted successfully!'
                    type='success'
                />,
                {position: "top-center"}
            )
        } catch (error) {
            console.error("Error creating partnership:", error)
            toast.custom(
                <CustomToast
                    message='Failed to submit the application. Please try again.'
                    type='error'
                />,
                {position: "top-center"}
            )
        }
    }

    const handleAskSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Logic for handling Ask for Partnership form submission
        console.log("Ask for partnership email:", askEmail)
        // Add your submission logic here
    }

    return (
        <div className={`h-screen w-screen flex flex-col items-center ${museoModerno.className}`}>
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
                </div>
                <div className='flex items-center gap-2'>
                    <Link href={"/partnership"}>
                        <button className='bg-black text-white px-2 rounded'>Partner Login</button>
                    </Link>
                </div>
            </div>

            <div className='bg-customYellow text-white text-center p-6 w-full bg-text-white'>
                <h1 className={`text-3xl font-bold ${museoModerno.className} text-white`}>
                    Partnership
                </h1>
                <p className={`mt-2 text-left text-white ${museoModerno.className}`}>
                    Take part in Los and start reaching people for free! Just offer rewards to our
                    community to join Los. No fees, just mutual benefits.
                </p>
            </div>

            <div className='flex space-x-4 mt-4'>
                <button
                    className='bg-black text-white py-2 px-4 rounded'
                    onClick={() => setShowAskForm(!showAskForm)}
                >
                    {"Apply for Partnership"}
                </button>
                {/* <button
                    className='bg-black text-white py-2 px-4 rounded'
                    onClick={() => setShowForm(!showForm)}
                >
                    {"Offer Rewards"}
                </button> */}
            </div>

            {/* {showForm && (
                <div className='w-full h-full'>
                    <form
                        onSubmit={handleSubmit}
                        className='bg-white p-4 rounded shadow-md max-w-md w-full flex h-full flex-col justify-between flex-grow'
                    >
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>
                                Your email address
                            </label>
                            <input
                                type='text'
                                value={email}
                                placeholder='E.g. example@example.com'
                                onChange={(e) => setEmail(e.target.value)}
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>
                                Name of your place
                            </label>
                            <input
                                type='text'
                                value={placeName}
                                placeholder='E.g. Gallery of Cool Experiences'
                                onChange={(e) => setPlaceName(e.target.value)}
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
                                required
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>
                                Description of the rewards
                            </label>
                            <textarea
                                value={description}
                                placeholder='E.g. Free entry for Los members or free drink for every 5 visits'
                                onChange={(e) => setDescription(e.target.value)}
                                className='mt-1 block w-full h-[20vh] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
                                rows={3}
                                required
                            />
                        </div>

                        <div className='flex space-x-4 mb-4'>
                            <div className='flex-grow'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Amount
                                </label>
                                <input
                                    type='text'
                                    placeholder='E.g. 3'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='bg-black text-white py-2 px-4 rounded transition duration-200 w-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )} */}

            {showAskForm && (
                <div className='w-full h-full mt-4'>
                    <form
                        onSubmit={handleAskSubmit}
                        className='bg-white p-4 rounded shadow-md max-w-md w-full flex flex-col'
                    >
                        <div className='mb-4'>
                            <p className='my-2'>
                                As a Los partner, you can start listing your events on Los and reach
                                new people. You can start posting your events and offer rewards to
                                Los community. We will reach you out after you send the application
                                for partnership.
                            </p>
                            <label className='block text-sm font-medium text-gray-700 mt-6'>
                                Your email address
                            </label>
                            <input
                                type='text'
                                value={askEmail}
                                placeholder='E.g. example@example.com'
                                onChange={(e) => setAskEmail(e.target.value)}
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='bg-black text-white py-2 px-4 rounded transition duration-200 w-full'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Partnership
