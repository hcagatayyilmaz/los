"use client"
import React, {useState, useEffect, useMemo, useCallback} from "react"
import {GoogleMap, useLoadScript, MarkerF, OverlayView, Libraries} from "@react-google-maps/api"
import {useLocation} from "../providers/LocationProvider"

type Location = {
    lat: number
    lng: number
    name: string
    points: number
}

const locations: Location[] = [
    {
        lat: 48.5253,
        lng: 9.0629,
        name: "Bibliothek (My Location)",
        points: 0
    },
    {
        lat: 48.519372574825454,
        lng: 9.055539088469041,
        name: "Hölderlinturm Museumscafé",
        points: 1000
    },
    {
        lat: 48.5216,
        lng: 9.0576,
        name: "Hohentübingen Castle",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5201,
        lng: 9.0556,
        name: "Tübingen Market Square",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5238,
        lng: 9.0519,
        name: "University of Tübingen",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5187,
        lng: 9.0589,
        name: "Stiftskirche",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5204,
        lng: 9.0627,
        name: "Botanical Garden",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5231,
        lng: 9.0552,
        name: "Neckar Bridge",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.518,
        lng: 9.0534,
        name: "Hölderlin Tower",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5309,
        lng: 9.0503,
        name: "Museum Alte Kulturen",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5241,
        lng: 9.0403,
        name: "Anlagensee Park",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5175,
        lng: 9.0645,
        name: "Neckar River",
        points: Math.floor(Math.random() * 10) * 10 + 10
    }
]

const LiveLocationPin = () => (
    <div className='relative'>
        <div className='absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-300 shadow-lg shadow-blue-500/50'></div>
        <div className='absolute w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75'></div>
    </div>
)
const libraries: Libraries = ["places", "geometry"]

const Map: React.FC = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries
    })

    const {userLocation} = useLocation()
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [nearbyLocation, setNearbyLocation] = useState<Location | null>(null)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [distances, setDistances] = useState<Record<string, number>>({})

    const mapContainerStyle = useMemo(
        () => ({
            width: "100vw",
            height: "calc(100vh - 40px)"
        }),
        []
    )

    const center = useMemo(
        () => ({
            lat: 48.5216, // Centered on Tübingen
            lng: 9.0576
        }),
        []
    )

    const onMapLoad = useCallback((map: google.maps.Map) => {
        setMap(map)
    }, [])

    useEffect(() => {
        if (userLocation && map && window.google) {
            const userLatLng = new window.google.maps.LatLng(userLocation.lat, userLocation.lng)

            const newDistances: Record<string, number> = {}
            let closest: Location | null = null
            let closestDistance = Infinity

            locations.forEach((location) => {
                const locationLatLng = new window.google.maps.LatLng(location.lat, location.lng)
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                    userLatLng,
                    locationLatLng
                )

                newDistances[location.name] = distance

                if (distance < closestDistance) {
                    closest = location
                    closestDistance = distance
                }
            })

            setDistances(newDistances)

            if (closest && closestDistance <= 50) {
                // Within 50 meters
                setNearbyLocation(closest)
            } else {
                setNearbyLocation(null)
            }
        }
    }, [userLocation, map])

    const logUserLocation = useCallback(() => {
        console.log("Current user location:", userLocation)
    }, [userLocation])

    if (loadError) return <div>Error loading maps</div>
    if (!isLoaded) return <div>Loading maps</div>

    return (
        <>
            <div className='bg-black text-white p-2 text-center h-10 flex items-center justify-center'>
                {userLocation ? (
                    <>
                        <p className='mr-4'>
                            Your location: Latitude {userLocation.lat.toFixed(4)}, Longitude{" "}
                            {userLocation.lng.toFixed(4)}
                            {nearbyLocation && <span> - You are at {nearbyLocation.name}!</span>}
                        </p>
                        <button
                            onClick={logUserLocation}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
                        >
                            Log Location
                        </button>
                    </>
                ) : (
                    <p>Waiting for your location...</p>
                )}
            </div>

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={userLocation || center}
                zoom={14}
                onLoad={onMapLoad}
            >
                {locations.map((location, index) => (
                    <MarkerF
                        key={index}
                        position={{lat: location.lat, lng: location.lng}}
                        onClick={() => setSelectedLocation(location)}
                    />
                ))}
                {userLocation && (
                    <OverlayView
                        position={userLocation}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <LiveLocationPin />
                    </OverlayView>
                )}
            </GoogleMap>
            {selectedLocation && (
                <div className='fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg'>
                    <h2 className='text-xl font-bold'>{selectedLocation.name}</h2>
                    <p className='text-lg text-green-600'>Points: {selectedLocation.points}</p>
                    {nearbyLocation === selectedLocation ? (
                        <p className='text-md text-blue-600'>You are here!</p>
                    ) : (
                        <p className='text-md text-blue-600'>
                            Distance:{" "}
                            {distances[selectedLocation.name] !== undefined
                                ? `${distances[selectedLocation.name].toFixed(2)} meters`
                                : "Calculating..."}
                        </p>
                    )}
                    <button
                        className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'
                        onClick={() => setSelectedLocation(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </>
    )
}

export default Map
