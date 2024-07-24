"use client"
import Link from "next/link"
import React, {useState, useEffect} from "react"
import Image from "next/image"
import {MuseoModerno} from "next/font/google"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import {useRouter} from "next/navigation"
import {applyForPartnership} from "@/app/server/index" // Import the server action
import {divIcon} from "leaflet"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

const Partnership: React.FC = () => {
    const {isAuthenticated} = useKindeBrowserClient()
    const [placeName, setPlaceName] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [price, setPrice] = useState("")
    const [message, setMessage] = useState<string | null>(null) // State to store the message
    const [language, setLanguage] = useState("EN")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await applyForPartnership({
                name: placeName,
                description,
                amount: amount,
                price: price
            })
            setMessage("Partnership application submitted successfully!") // Set success message
        } catch (error) {
            console.error("Error creating partnership:", error)
            setMessage("Failed to submit the application. Please try again.") // Set error message
        }
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
                        <button className='bg-black text-white px-2 rounded'>Partnership</button>
                    </Link>
                    <button className='text-sm font-medium text-gray-700 focus:outline-none'>
                        {language === "EN" ? "EN | DE" : "DE | EN"}
                    </button>
                </div>
            </div>

            <div className='bg-customYellow text-white text-center p-6 w-full bg-text-white'>
                <h1 className={`text-3xl font-bold ${museoModerno.className} text-white`}>
                    Partnership
                </h1>
                <p className={`mt-2 text-left text-white ${museoModerno.className}`}>
                    Advertise your place without paying anything to us! Just offer rewards to our
                    community to join Los. No fees, just mutual benefits.
                </p>
            </div>

            <div className='w-full h-full'>
                <form
                    onSubmit={handleSubmit}
                    className='bg-white p-4 rounded shadow-md max-w-md w-full flex h-full flex-col justify-between flex-grow'
                >
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Place</label>
                        <input
                            type='text'
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='mt-1 block w-full h-[30vh] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
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
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
                                required
                            />
                        </div>
                        <div className='flex-grow'>
                            <label className='block text-sm font-medium text-gray-700'>Price</label>
                            <input
                                type='text'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customYellow focus:border-customYellow sm:text-sm'
                                required
                            />
                        </div>
                    </div>
                    {message ? (
                        <div className='mt-4 text-center text-sm text-customYellow'>{message}</div>
                    ) : (
                        ""
                    )}

                    <button
                        type='submit'
                        className='bg-black text-white py-2 px-4 rounded transition duration-200 w-full'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Partnership
