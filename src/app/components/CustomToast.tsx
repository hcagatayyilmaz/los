"use client"
import React, {useState, useEffect} from "react"

interface CustomToastProps {
  message: string
  type: "success" | "error"
}

const CustomToast: React.FC<CustomToastProps> = ({message, type}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000) // Auto-hide after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={` bg-customYellow
 text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-center space-x-2 text-xs cursor-pointer`}
    >
      <span>
        {type === "success" ? (
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 13l4 4L19 7'
            ></path>
          </svg>
        ) : (
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            ></path>
          </svg>
        )}
      </span>
      <span>{message}</span>
    </div>
  )
}

export default CustomToast
