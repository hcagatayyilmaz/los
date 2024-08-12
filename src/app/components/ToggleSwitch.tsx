import React, {useState} from "react"
import {BsList} from "react-icons/bs"
import {MdMap} from "react-icons/md"

const ToggleSwitch = () => {
    const [isMapView, setIsMapView] = useState(false)

    const toggleView = (view: any) => {
        setIsMapView(view === "map")
    }

    return (
        <div className='flex items-center bg-white  gap-2 rounded-full border shadow-lg'>
            <button
                className={`${
                    !isMapView ? "bg-customYellow text-white" : "text-black"
                } flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ease-in-out`}
                onClick={() => toggleView("list")}
            >
                <BsList size={20} />
            </button>
            <button
                className={`${
                    isMapView ? "bg-customYellow text-white" : "text-black"
                } flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ease-in-out`}
                onClick={() => toggleView("map")}
            >
                <MdMap size={20} />
            </button>
        </div>
    )
}

export default ToggleSwitch
