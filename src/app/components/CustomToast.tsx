import React from "react"
import {toast} from "react-hot-toast"

const CustomToast = ({message, type}: {message: string; type: "success" | "error"}) => {
    return (
        <div
            className={`${
                type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-center space-x-2 text-xs`}
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
