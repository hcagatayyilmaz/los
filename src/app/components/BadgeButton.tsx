"use client"

import React from "react"
import {obtainBadge} from "../server"
import {toast} from "react-hot-toast"
import CustomToast from "./CustomToast" // Ensure correct path to the CustomToast component

const handleClick = async (id: string) => {
  try {
    const response = await obtainBadge(id)
    toast.custom(<CustomToast message={response.message} type='success' />, {
      position: "top-center",
      duration: 1000
    })
  } catch (error: any) {
    toast.custom(
      <CustomToast
        message={error.message || "An error occurred"}
        type='error'
      />,
      {
        position: "top-center",
        duration: 1000
      }
    )
  }
}

function BadgeButton({id, name}: {id: string; name: string}) {
  return (
    <button
      className='w-full mx-auto px-4 py-2 rounded-2xl bg-customYellow text-white text-center'
      onClick={() => handleClick(id)}
    >
      Get the Badge!
    </button>
  )
}

export default BadgeButton
