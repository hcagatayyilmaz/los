"use client"
import React, {useState, useEffect} from "react"
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import {useLocation} from "../providers/LocationProvider"

const locations = [
    {
        lat: 48.5253,
        lng: 9.0621,
        name: "Bibliothek (My Location)",
        points: 0
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

const Map = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places", "geometry"]
    })

    const {userLocation} = useLocation()
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [nearbyLocation, setNearbyLocation] = useState(null)
    const [map, setMap] = useState(null)

    const mapContainerStyle = {
        width: "100vw",
        height: "calc(100vh - 40px)"
    }

    const center = {
        lat: 48.5216, // Centered on Tübingen
        lng: 9.0576
    }

    useEffect(() => {
        if (userLocation && map && window.google) {
            const userLatLng = new window.google.maps.LatLng(userLocation.lat, userLocation.lng)

            let closest = null
            let closestDistance = Infinity

            locations.forEach((location) => {
                const locationLatLng = new window.google.maps.LatLng(location.lat, location.lng)
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                    userLatLng,
                    locationLatLng
                )

                console.log(`Distance to ${location.name}: ${distance.toFixed(2)} meters`)

                if (distance < closestDistance) {
                    closest = location
                    closestDistance = distance
                }
            })

            if (closestDistance <= 50) {
                // Within 50 meters
                setNearbyLocation(closest)
                console.log(
                    `You are near ${closest.name}! Distance: ${closestDistance.toFixed(2)} meters`
                )
            } else {
                setNearbyLocation(null)
                console.log(
                    `Closest location: ${closest.name}, Distance: ${closestDistance.toFixed(
                        2
                    )} meters`
                )
            }
        }
    }, [userLocation, map])

    const onMapLoad = (map) => {
        setMap(map)
    }

    if (loadError) return <div>Error loading maps</div>
    if (!isLoaded) return <div>Loading maps</div>

    return (
        <>
            <div className='bg-black text-white p-2 text-center h-10 flex items-center justify-center'>
                {userLocation ? (
                    <p>
                        Your location: Latitude {userLocation.lat.toFixed(4)}, Longitude{" "}
                        {userLocation.lng.toFixed(4)}
                        {nearbyLocation && <span> - You are at {nearbyLocation.name}!</span>}
                    </p>
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
                    <MarkerF
                        position={userLocation}
                        icon='http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    />
                )}
            </GoogleMap>
            {selectedLocation && (
                <div className='fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg'>
                    <h2 className='text-xl font-bold'>{selectedLocation.name}</h2>
                    <p className='text-lg text-green-600'>Points: {selectedLocation.points}</p>
                    {nearbyLocation === selectedLocation ? (
                        <p className='text-md text-blue-600'>You are here!</p>
                    ) : (
                        <p className='text-md text-blue-600'>Distance: Calculating...</p>
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
