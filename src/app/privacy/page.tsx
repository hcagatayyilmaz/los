import React from "react"
import {MuseoModerno} from "next/font/google"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function Page() {
    return (
        <div className={`h-screen w-screen p-4 flex flex-col items-center`}>
            <h1 className={`text-2xl font-bold mb-4 ${museoModerno.className}`}>
                Privacy Policy for Los
            </h1>

            <section className='mb-6'>
                <h2 className={`text-xl font-semibold mb-2 ${museoModerno.className}`}>
                    1. Introduction and Purpose
                </h2>
                <p className='text-base'>
                    Welcome to <strong>Los</strong>, a gamified, rewards-based city exploration app
                    designed to help you discover events, attractions, and experiences while
                    allowing small businesses to offer rewards without charge. This Privacy Policy
                    outlines how we collect, use, and protect your personal information when you use
                    our services.
                </p>
            </section>

            <section className='mb-6'>
                <h2 className={`text-xl font-semibold mb-2 ${museoModerno.className}`}>
                    2. Data Collection
                </h2>
                <h3 className='text-lg font-medium mb-1'>Types of Data Collected:</h3>
                <ul className='list-disc list-inside'>
                    <li>
                        <strong>Personal Information:</strong> We collect basic personal information
                        such as your email, first name, last name, and optional profile image during
                        account registration.
                    </li>
                    <li>
                        <strong>Location Data:</strong> With your permission, we access your
                        browser's location to provide location-based features.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Information about your interactions with the
                        app, including check-ins, points, and transactions.
                    </li>
                </ul>

                <h3 className='text-lg font-medium mt-4 mb-1'>Collection Methods:</h3>
                <ul className='list-disc list-inside'>
                    <li>
                        <strong>User Registration:</strong> Personal information is collected during
                        account creation.
                    </li>
                    <li>
                        <strong>Location Access:</strong> We request location access for app
                        functionality without storing or sharing this data externally.
                    </li>
                    <li>
                        <strong>App Interactions:</strong> Data on activities within the app to
                        personalize the experience and provide rewards.
                    </li>
                </ul>
            </section>

            <section className='mb-6'>
                <h2 className={`text-xl font-semibold mb-2 ${museoModerno.className}`}>
                    3. Use of Data
                </h2>
                <p className='text-base'>
                    <strong>Purpose of Data Use:</strong> Personal information is used for account
                    management, personalization, and communication. Location data centers the map on
                    your location and shows nearby attractions, running entirely on your device with
                    no external storage . Only check-in data is collected to manage rewards.
                </p>
                <p className='text-base mt-2'>
                    <strong>Third-Party Services:</strong> We use services like Kinde Auth for
                    authentication. For more details, refer to{" "}
                    <a
                        href='https://www.kinde.com/privacy-policy'
                        className='text-blue-500 underline'
                    >
                        Kinde's privacy policy
                    </a>
                    .
                </p>
            </section>
        </div>
    )
}

export default Page
