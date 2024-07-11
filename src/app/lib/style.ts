const mapStyle = [
    {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#bcd8bf"
            }
        ]
    },
    {
        featureType: "administrative.country",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#472424"
            }
        ]
    },
    {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#cbe7ce"
            },
            {
                lightness: "-16"
            }
        ]
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#cbe7ce"
            }
        ]
    },
    {
        featureType: "landscape.natural.landcover",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#cbe7ce"
            }
        ]
    },
    {
        featureType: "landscape.natural.terrain",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#cbe7ce"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.attraction",
        elementType: "all",
        stylers: [
            {
                color: "#0172be"
            }
        ]
    },
    {
        featureType: "poi.attraction",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.business",
        elementType: "all",
        stylers: [
            {
                color: "#d73c97"
            }
        ]
    },
    {
        featureType: "poi.business",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.government",
        elementType: "all",
        stylers: [
            {
                color: "#f5931d"
            }
        ]
    },
    {
        featureType: "poi.government",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.medical",
        elementType: "all",
        stylers: [
            {
                color: "#ea2525"
            }
        ]
    },
    {
        featureType: "poi.medical",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "all",
        stylers: [
            {
                color: "#00b25c"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.place_of_worship",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.school",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.sports_complex",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#fdf22f"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#cbe7ce"
            },
            {
                lightness: "69"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "all",
        stylers: [
            {
                hue: "#39ff00"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#cbe7ce"
            },
            {
                lightness: "52"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.station",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.station.airport",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.station.bus",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.station.rail",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#a8e1fc"
            }
        ]
    }
]
export const mapStyle2 = [
    {
        featureType: "all",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "all",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#444444"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [
            {
                saturation: "1"
            }
        ]
    },
    {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
            {
                saturation: "51"
            }
        ]
    },
    {
        featureType: "landscape.natural.landcover",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            },
            {
                saturation: "45"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "all",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#63c374"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
            {
                saturation: "0"
            },
            {
                lightness: "0"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            },
            {
                color: "#275213"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "all",
        stylers: [
            {
                saturation: -100
            },
            {
                lightness: 45
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "all",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#3490d0"
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    }
]

export default mapStyle
