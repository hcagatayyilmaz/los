const mapStyle = [
    {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#e0efef"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#c0e8e8"
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
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                lightness: 100
            },
            {
                visibility: "simplified"
            },
            {
                weight: 3 // Increase the size of the streets
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#ffffff" // Ensure road fill is visible
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off" // Remove all road labels
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
            {
                visibility: "on"
            },
            {
                lightness: 700
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#7dcdcd"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
            {
                visibility: "off" // Remove administrative labels
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "labels",
        stylers: [
            {
                visibility: "off" // Remove local road labels
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "labels",
        stylers: [
            {
                visibility: "off" // Remove transit labels
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

export const mapStyleWithoutText = [
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
        featureType: "landscape",
        elementType: "labels",
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
                visibility: "on"
            },
            {
                color: "#e0efef"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#c0e8e8"
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
        featureType: "road",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                lightness: 100
            },
            {
                visibility: "simplified"
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
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
            {
                visibility: "on"
            },
            {
                lightness: 700
            }
        ]
    },
    {
        featureType: "transit.line",
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
                color: "#7dcdcd"
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
