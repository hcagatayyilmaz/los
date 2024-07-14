"use client"

import React, {useState, useEffect} from "react"
import {obtainBadge, foundHideAndSeek, submitQuiz} from "@/app/server/index" // Adjust the import path as necessary
import {useUserLocation} from "@/app/providers/useUserLocation" // Adjust the import path as necessary
import MapWithRadius from "@/app/components/MapWithRadius" // Adjust the import path as necessary
import {Location} from "@/app/lib/types"

type QuestsPageParams = {
    params: {
        slug: string
    }
}

const hideAndSeekLocation: Location = {
    id: "1",
    lat: 48.52605,
    lng: 9.05584,
    name: "Tübingen Paleontology Museum",
    points: 100,
    description: "Find the dinosaur in Tübingen!",
    type: 1
}

function QuestsPage({params}: QuestsPageParams) {
    const [message, setMessage] = useState<string | null>(null)
    const [quizMessage, setQuizMessage] = useState<string | null>(null)
    const [showPopQuiz, setShowPopQuiz] = useState(false)
    const [showObtainBadge, setShowObtainBadge] = useState(false)
    const [showHideAndSeek, setShowHideAndSeek] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const {userLocation} = useUserLocation()

    const handleObtainBadge = async () => {
        try {
            const response = await obtainBadge({badgeId: "clyk4su0c00004qxzqb064tl8"})
            alert(response.message)
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert("An unknown error occurred.")
            }
        }
    }

    const handleHideAndSeek = async () => {
        if (!userLocation) {
            alert("Unable to get your location.")
            return
        }

        try {
            const response = await foundHideAndSeek({
                hideAndSeekId: "clyk6c7m10001kcld3ozbeuda",
                userLat: userLocation.lat,
                userLng: userLocation.lng
            })
            setMessage(response.message)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message)
            } else {
                setMessage("An unknown error occurred.")
            }
        }
    }

    const handlePopQuiz = async () => {
        if (!selectedAnswer) {
            alert("Please select an answer.")
            return
        }
        try {
            const response = await submitQuiz({
                quizId: "clylkf5ty000059kyi68merg8",
                submitted_answer: selectedAnswer
            })
            setQuizMessage(response.message)
        } catch (error) {
            if (error instanceof Error) {
                setQuizMessage(error.message)
            } else {
                setQuizMessage("An unknown error occurred.")
            }
        }
    }

    return (
        <div
            style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "20px",
                backgroundColor: "#FFF0F5",
                fontFamily: "Verdana, Arial, sans-serif",
                border: "1px solid #000",
                borderRadius: "10px"
            }}
        >
            <h1
                style={{
                    fontSize: "36px",
                    color: "#0000FF",
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                Quests
            </h1>
            <hr style={{borderColor: "#0000FF", marginBottom: "20px"}} />
            <table width='100%' cellPadding='10' cellSpacing='0'>
                <tbody>
                    <tr>
                        <td style={{backgroundColor: "#FFDEAD"}}>
                            <h2
                                style={{fontSize: "24px", cursor: "pointer"}}
                                onClick={() => setShowObtainBadge(!showObtainBadge)}
                            >
                                Obtain Badge {showObtainBadge ? "▲" : "▼"}
                            </h2>
                            {showObtainBadge && (
                                <div
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#FFFACD",
                                        borderRadius: "5px"
                                    }}
                                >
                                    <p style={{color: "#000080"}}>
                                        Coffee Addict - If you already checked in 3 cool kaffee
                                        places you can obtain this rewards and get points!
                                    </p>
                                    <button
                                        style={{
                                            backgroundColor: "#FF4500",
                                            color: "#FFF",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                        onClick={handleObtainBadge}
                                    >
                                        Click here to obtain the badge
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "#FFDEAD"}}>
                            <h2
                                style={{fontSize: "24px", cursor: "pointer"}}
                                onClick={() => setShowHideAndSeek(!showHideAndSeek)}
                            >
                                Hide & Seek {showHideAndSeek ? "▲" : "▼"}
                            </h2>
                            {showHideAndSeek && (
                                <div
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#FFFACD",
                                        borderRadius: "5px"
                                    }}
                                >
                                    <p style={{color: "#000080"}}>
                                        Find the dinosaur in Tübingen and get points! Click &quot;I
                                        Found&quot; when you are at the correct location.
                                    </p>
                                    <MapWithRadius location={hideAndSeekLocation} />
                                    <button
                                        style={{
                                            backgroundColor: "#FF4500",
                                            color: "#FFF",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                        onClick={handleHideAndSeek}
                                    >
                                        I Found
                                    </button>
                                    {message && (
                                        <p style={{color: "#32CD32", marginTop: "10px"}}>
                                            {message}
                                        </p>
                                    )}
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: "#FFDEAD"}}>
                            <h2
                                style={{fontSize: "24px", cursor: "pointer"}}
                                onClick={() => setShowPopQuiz(!showPopQuiz)}
                            >
                                Pop Quiz {showPopQuiz ? "▲" : "▼"}
                            </h2>
                            {showPopQuiz && (
                                <div
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#FFFACD",
                                        borderRadius: "5px"
                                    }}
                                >
                                    <p style={{color: "#000080"}}>
                                        How old is the tree in Park Bota?
                                    </p>
                                    <div style={{marginBottom: "10px"}}>
                                        <label style={{display: "block"}}>
                                            <input
                                                type='radio'
                                                name='quiz'
                                                value='50 years'
                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                                style={{marginRight: "5px"}}
                                            />
                                            50 years
                                        </label>
                                        <label style={{display: "block"}}>
                                            <input
                                                type='radio'
                                                name='quiz'
                                                value='100 years'
                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                                style={{marginRight: "5px"}}
                                            />
                                            100 years
                                        </label>
                                        <label style={{display: "block"}}>
                                            <input
                                                type='radio'
                                                name='quiz'
                                                value='150 years'
                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                                style={{marginRight: "5px"}}
                                            />
                                            150 years
                                        </label>
                                        <label style={{display: "block"}}>
                                            <input
                                                type='radio'
                                                name='quiz'
                                                value='250 years'
                                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                                style={{marginRight: "5px"}}
                                            />
                                            250 years
                                        </label>
                                    </div>
                                    <button
                                        style={{
                                            backgroundColor: "#FF4500",
                                            color: "#FFF",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                        onClick={handlePopQuiz}
                                    >
                                        Submit Answer
                                    </button>
                                    {quizMessage && (
                                        <p style={{color: "#32CD32", marginTop: "10px"}}>
                                            {quizMessage}
                                        </p>
                                    )}
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default QuestsPage
