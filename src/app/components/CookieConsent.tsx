"use client"

import React, {useState, useEffect} from "react"
import {MuseoModerno} from "next/font/google"

const museoModerno = MuseoModerno({
  subsets: ["latin"]
})

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (consent === null) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white px-4 shadow-md '>
      <div className='w-full max-w-md mx-auto flex p-4 flex-col sm:flex-row items-center justify-between order-2 border-black'>
        <p
          className={`${museoModerno.className} text-sm text-gray-800 mb-4 sm:mb-0`}
        >
          We use cookies to enhance your experience. By continuing to visit this
          site you agree to our use of cookies.
        </p>
        <div className='flex space-x-4'>
          <button
            onClick={handleAccept}
            className={`${museoModerno.className} bg-customYellow text-white px-4 py-2 rounded-full hover:bg-black transition duration-300`}
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className={`${museoModerno.className} bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300`}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
