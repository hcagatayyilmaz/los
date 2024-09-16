"use client"
import React, {useState, useEffect, useRef, useMemo, useCallback} from "react"
import {
  GoogleMap,
  useLoadScript,
  OverlayView,
  Libraries
} from "@react-google-maps/api"
import {useUserLocation} from "../providers/useUserLocation"
import mapStyle from "../lib/style"
import {Location} from "../lib/types"
import {useSelectedItem} from "@/app/providers/useSelectedItem"
import {LiveLocationPin, ItemPin} from "./Pins"
// import {generateSyntheticMapPlaces} from "../server/data" // Import the function

const libraries: Libraries = ["places", "geometry"]

const Map: React.FC<{
  locations: Location[]
  isMapPage?: boolean
  syntheticData?: Location[]
  cityCenter?: {
    lat: number
    lng: number
  }
}> = ({locations, isMapPage, syntheticData, cityCenter}) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries
  })

  const {userLocation} = useUserLocation()
  const {setSelectedLocation, updateSelectedLocation, selectedLocation} =
    useSelectedItem()
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isCentered, setIsCentered] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(15)

  const mapContainerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100vh"
    }),
    []
  )

  const tübingenCoordinates = useMemo(
    () =>
      cityCenter
        ? {
            lat: cityCenter.lat,
            lng: cityCenter.lng
          }
        : {
            lat: 48.5216,
            lng: 9.0576
          },
    [cityCenter]
  )

  const initialCenter = useMemo(() => {
    if (userLocation) {
      return {lat: userLocation.lat, lng: userLocation.lng}
    } else if (locations.length > 0) {
      const firstLocation = locations[0]
      return {lat: firstLocation.latitude, lng: firstLocation.longitude}
    } else {
      return tübingenCoordinates
    }
  }, [userLocation, locations, tübingenCoordinates])

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map)

      // Add event listeners for zoom controls
      const zoomInButton = map.getDiv().querySelector('button[title="Zoom in"]')
      const zoomOutButton = map
        .getDiv()
        .querySelector('button[title="Zoom out"]')

      if (zoomInButton) {
        zoomInButton.addEventListener("click", () =>
          console.log("User clicked zoom in")
        )
      }
      if (zoomOutButton) {
        zoomOutButton.addEventListener("click", () =>
          console.log("User clicked zoom out")
        )
      }

      if (isMapPage) {
        map.setZoom(4)
      } else if (userLocation && !isCentered) {
        map.setCenter(
          new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
        )
        map.setZoom(13)
        setIsCentered(true)
      } else if (locations.length > 0 && !isCentered) {
        const firstLocation = locations[0]
        map.setCenter({
          lat: firstLocation.latitude,
          lng: firstLocation.longitude
        })
        map.setZoom(13)
        setIsCentered(true)
      } else if (!isCentered) {
        map.setCenter(tübingenCoordinates)
        map.setZoom(13)
        setIsCentered(true)
      }
    },

    [userLocation, isCentered, locations, tübingenCoordinates, isMapPage]
  )

  useEffect(() => {
    if (map && userLocation && !isCentered && !isMapPage) {
      map.setCenter(
        new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
      )
      map.setZoom(16)
      setIsCentered(true)
    }
  }, [map, userLocation, isCentered, isMapPage])

  useEffect(() => {
    if (selectedLocation && map) {
      const {latitude, longitude} = selectedLocation
      map.panTo({lat: latitude, lng: longitude})
    }
  }, [selectedLocation, map])

  // New effect to handle centering map on user location
  useEffect(() => {
    const centerMapToUserLocation = () => {
      if (map && userLocation) {
        map.panTo(
          new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
        )
        map.setZoom(16)
      }
    }

    window.addEventListener("centerMapToUserLocation", centerMapToUserLocation)

    return () => {
      window.removeEventListener(
        "centerMapToUserLocation",
        centerMapToUserLocation
      )
    }
  }, [map, userLocation])

  // // Fetch synthetic data only once when user location arrives
  // useEffect(() => {
  //   if (isMapPage && userLocation && !hasFetchedSyntheticData.current) {
  //     const fetchSyntheticData = async () => {
  //       try {
  //         const data = await generateSyntheticMapPlaces(
  //           userLocation.lat,
  //           userLocation.lng
  //         )
  //         setSyntheticMapData(data as Location[])
  //         hasFetchedSyntheticData.current = true // Set the flag to true
  //       } catch (error) {
  //         console.error("Error fetching synthetic map data:", error)
  //       }
  //     }
  //     fetchSyntheticData()
  //   }
  // }, [isMapPage, userLocation]) // Update dependencies

  const handlePinClick = useCallback(
    (location: Location) => {
      console.log(zoomLevel)
      updateSelectedLocation(location)
      if (map) {
        map.panTo({lat: location.latitude, lng: location.longitude})
      }
    },
    [zoomLevel, updateSelectedLocation, map]
  )

  const allLocations = useMemo(
    () => [...(locations || []), ...(syntheticData || [])],
    [locations, syntheticData]
  )

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps</div>

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      onLoad={onMapLoad}
      zoom={isMapPage ? 4 : 12}
      onZoomChanged={() => {
        if (map) {
          const newZoom = map.getZoom() || 15
          console.log(`Zoom changed to: ${newZoom}`)
          setZoomLevel(newZoom)
        }
      }}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        styles: mapStyle,
        zoomControl: true,
        streetViewControl: false,
        gestureHandling: "auto",
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        }
      }}
    >
      {/* {allLocations.map((location, index) => (
        <OverlayView
          key={index}
          position={{lat: location.latitude, lng: location.longitude}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div onClick={() => handlePinClick(location)}>
            <ItemPin
              location={location}
              isSelected={selectedLocation?.id === location.id}
              zoomLevel={zoomLevel}
              isSynthetic={location.isSynthetic}
              updateSelectedLocation={updateSelectedLocation}
            />
          </div>
        </OverlayView>
      ))}
      {userLocation && (
        <OverlayView
          position={userLocation}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <LiveLocationPin />
        </OverlayView>
      )} */}
    </GoogleMap>
  )
}

export default React.memo(Map)
