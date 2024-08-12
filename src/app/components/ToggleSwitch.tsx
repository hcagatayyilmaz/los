"use client"
import React from "react"
import {BsList} from "react-icons/bs"
import {MdMap} from "react-icons/md"
import {useUIContext} from "@/app/providers/UIProvider" // Ensure the correct path

const ToggleSwitch = () => {
    const {isListView, setIsListView} = useUIContext() // Use context to manage view state

    const toggleView = (view: string) => {
        setIsListView(view === "list")
    }

    return (
        <div className='flex items-center bg-white gap-2 rounded-full border shadow-lg'>
            <button
                className={`${
                    isListView ? "bg-customYellow text-white" : "text-black"
                } flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ease-in-out`}
                onClick={() => toggleView("list")}
            >
                <BsList size={20} />
            </button>
            <button
                className={`${
                    !isListView ? "bg-customYellow text-white" : "text-black"
                } flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ease-in-out`}
                onClick={() => toggleView("map")}
            >
                <MdMap size={20} />
            </button>
        </div>
    )
}

export default ToggleSwitch
