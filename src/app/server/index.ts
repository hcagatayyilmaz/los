"use server"

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {PrismaClient} from "@prisma/client"
import {calculateDistance3} from "@/app/lib/utils"
import {revalidatePath} from "next/cache"
import {redirect} from "next/navigation"
import mongoose from "mongoose"
import SyntheticPlaceSchema from "../../../mongodb/schema"
import {ISyntheticPlace} from "../../../mongodb/schema"
import dbConnect from "../../../mongodb/mongodb"

//import { getRedisClient, closeRedisConnection } from "../../../redis/redis"

const prisma = new PrismaClient()

export async function checkIn({
  placeId,
  userLat,
  userLng
}: {
  placeId: string
  userLat: number
  userLng: number
}) {
  "use server"

  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    console.error("User not authenticated")
    return {
      success: false,
      message: "Please login to check in"
    }
  }

  const place = await prisma.attraction.findUnique({
    where: {id: placeId}
  })

  if (!place) {
    console.error("Place not found")
    return {
      success: false,
      message: "Place not found"
    }
  }

  const distance = await calculateDistance3(
    userLat,
    userLng,
    place.latitude,
    place.longitude
  )
  if (distance <= 40) {
    // 25 meters threshold
    const checkIn = await prisma.checkIn.create({
      data: {
        userId: user.id,
        attractionId: placeId
      }
    })

    await prisma.user.update({
      where: {id: user.id},
      data: {points: {increment: place.points}}
    })

    await prisma.transaction.create({
      data: {
        userId: user.id,
        points: place.points,
        details: `checkin_id:${checkIn.id}`,
        type: "EARN_POINTS"
      }
    })

    return {
      success: true,
      message: "Checked in successfully",
      points: place.points
    }
  } else {
    return {
      success: false,
      message: "You are too far from the place to check in"
    }
  }
}

export async function checkInSyntheticLocation({
  placeId,
  userLat,
  userLng
}: {
  placeId: string
  userLat: number
  userLng: number
}) {
  "use server"

  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    console.error("User not authenticated")
    return {
      success: false,
      message: "Please login to check in"
    }
  }

  await dbConnect()

  // Check if the user has already checked in to this synthetic place
  const existingCheckIn = await prisma.checkIn.findFirst({
    where: {
      userId: user.id,
      syntheticPlaceId: placeId,
      isSynthetic: true
    }
  })

  if (existingCheckIn) {
    return {
      success: false,
      message: "You have already checked in to this place"
    }
  }

  let place: ISyntheticPlace | null
  try {
    const result = await SyntheticPlaceSchema.findById(placeId).lean()
    place = result as ISyntheticPlace
    if (!place) {
      console.error("Synthetic place not found")
      return {
        success: false,
        message: "Place not found. Please reach the support."
      }
    }
  } catch (error) {
    console.error("Error fetching synthetic place:", error)
    return {
      success: false,
      message: "Place not found. Please reach the support."
    }
  }

  const distance = await calculateDistance3(
    userLat,
    userLng,
    place.location.coordinates[1],
    place.location.coordinates[0]
  )
  if (distance <= 40) {
    // 40 meters threshold for synthetic places
    const checkIn = await prisma.checkIn.create({
      data: {
        userId: user.id,
        isSynthetic: true,
        syntheticPlaceId: placeId
      }
    })

    await prisma.user.update({
      where: {id: user.id},
      data: {points: {increment: place.points}}
    })

    await prisma.transaction.create({
      data: {
        userId: user.id,
        points: place.points,
        details: `checkin_id:${checkIn.id}`,
        type: "EARN_POINTS"
      }
    })

    // Update the synthetic place document to set checkedIn to true
    try {
      await SyntheticPlaceSchema.findByIdAndUpdate(placeId, {checkedIn: true})
    } catch (error) {
      console.error("Error updating synthetic place:", error)
      return {
        success: false,
        message: "Place not found. Please reach the support."
      }
    }

    return {
      success: true,
      message: "Checked in successfully",
      points: place.points
    }
  } else {
    return {
      success: false,
      message: "You are too far from the place to check in"
    }
  }
}

export async function obtainBadge(badgeId: string) {
  "use server"

  const {getUser} = await getKindeServerSession()
  const user = await getUser()

  if (!user) {
    console.error("User not authenticated")
    return {
      success: false,
      message: "Please login to obtain badge."
    }
  }

  const badge = await prisma.badge.findUnique({
    where: {id: badgeId},
    include: {attractions: true} // Ensure to fetch attractions
  })

  if (!badge) {
    console.error("Badge not found")
    return {
      success: false,
      message: "Badge is not found."
    }
  }

  // Check if the user already has the badge
  const userHasBadge = await prisma.userBadge.findUnique({
    where: {
      userId_badgeId: {
        userId: user.id,
        badgeId: badgeId
      }
    }
  })

  if (userHasBadge) {
    return {
      success: false,
      message: "Great! You already have this badge."
    }
  }

  const checkIns = await prisma.checkIn.findMany({
    where: {
      userId: user.id,
      attractionId: {
        in: badge.attractions.map(
          (badgeAttraction) => badgeAttraction.attractionId
        )
      }
    }
  })

  if (checkIns.length !== badge.attractions.length) {
    return {
      success: false,
      message: "Please check in all places to get the badge!"
    }
  }

  // Add badge to user
  await prisma.userBadge.create({
    data: {
      userId: user.id,
      badgeId: badgeId
    }
  })

  // Add points to user
  await prisma.user.update({
    where: {id: user.id},
    data: {points: {increment: badge.points}}
  })

  await prisma.transaction.create({
    data: {
      userId: user.id,
      points: badge.points,
      details: `badge_id:${badgeId}`,
      type: "EARN_POINTS"
    }
  })

  return {message: "Badge obtained successfully!"}
}

export async function foundHideAndSeek({
  hideAndSeekId,
  userLat,
  userLng
}: {
  hideAndSeekId: string
  userLat: number
  userLng: number
}) {
  "use server"

  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    console.error("User not authenticated")
    return {
      success: false,
      message: "Please login to find the hidden location."
    }
  }

  const hideAndSeek = await prisma.hideAndSeek.findUnique({
    where: {id: hideAndSeekId},
    include: {attraction: true}
  })

  if (hideAndSeek && hideAndSeek.attraction) {
    const distance = await calculateDistance3(
      userLat,
      userLng,
      hideAndSeek.attraction.latitude,
      hideAndSeek.attraction.longitude
    )

    if (distance <= 20) {
      const userHideAndSeek = await prisma.userHideAndSeek.create({
        data: {
          userId: user.id,
          hideAndSeekId: hideAndSeek.id
        }
      })

      await prisma.user.update({
        where: {id: user.id},
        data: {points: {increment: hideAndSeek.points}}
      })

      await prisma.transaction.create({
        data: {
          userId: user.id,
          points: hideAndSeek.points,
          details: `hide_and_seek_id:${userHideAndSeek.id}`,
          type: "EARN_POINTS"
        }
      })

      return {
        message: "Congratulations! You've found the location and earned points!"
      }
    } else {
      return {
        message: `You are ${distance} meters away from the correct location.`
      }
    }
  } else {
    console.error(
      "HideAndSeek or attraction data not found for ID:",
      hideAndSeekId
    )
    return {
      success: false,
      message: "HideAndSeek or attraction data not found"
    }
  }
}

export async function submitQuiz({
  quizId,
  submitted_answer
}: {
  quizId: string
  submitted_answer: string
}) {
  "use server"
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    console.error("User not authenticated")
    return {
      success: false,
      message: "Please login to submit answers."
    }
  }
  const quiz = await prisma.quiz.findUnique({
    where: {id: quizId}
  })
  if (!quiz) {
    console.error("Quiz not found")
    return {
      success: false,
      message: "Quiz not found"
    }
  }

  // Check if the user has already submitted an answer for this quiz
  const previousAnswer = await prisma.userQuiz.findUnique({
    where: {
      userId_quizId: {
        userId: user.id,
        quizId: quiz.id
      }
    }
  })

  if (previousAnswer) {
    console.error("User already submitted an answer for this quiz")
    return {
      success: false,
      message: "You already submitted an answer for this quiz"
    }
  }

  const userQuiz = await prisma.userQuiz.create({
    data: {
      userId: user.id,
      quizId: quiz.id,
      submitted_answer: submitted_answer
    }
  })

  if (submitted_answer !== quiz.answer) {
    return {message: "Incorrect answer!"}
  } else {
    await prisma.user.update({
      where: {id: user.id},
      data: {points: {increment: quiz.points}}
    })

    await prisma.transaction.create({
      data: {
        userId: user.id,
        points: quiz.points,
        details: `quiz_id:${userQuiz.id}`,
        type: "EARN_POINTS"
      }
    })

    return {message: "Correct answer! Points earned!"}
  }
}

export async function checkReward({rewardId}: {rewardId: string}) {
  "use server"
  const reward = await prisma.reward.findUnique({
    where: {id: rewardId}
  })

  if (!reward) {
    console.error("Reward not found")
    return {
      success: false,
      message: "Reward not found"
    }
  }

  return reward
}

export async function redeemReward(rewardId: string) {
  "use server"
  const {getUser} = getKindeServerSession()
  const kindeUser = await getUser()
  const user = kindeUser
    ? await prisma.user.findUnique({where: {id: kindeUser.id}})
    : null
  console.log("Reward ID:", rewardId)
  if (!user) {
    console.error("User not authenticated")
    return {
      success: false,
      message: "Please login to redeem rewards"
    }
  }

  const reward = await prisma.reward.findUnique({
    where: {id: rewardId}
  })

  if (!reward) {
    console.error("Reward not found")
    return {
      success: false,
      message: "Reward not found"
    }
  }

  if (user.points < reward.points) {
    console.error("Insufficient points")
    return {
      success: false,
      message: "Insufficient points"
    }
  }

  await prisma.user.update({
    where: {id: user.id},
    data: {points: {decrement: reward.points}}
  })

  await prisma.transaction.create({
    data: {
      userId: user.id,
      points: -reward.points,
      details: `reward_id:${reward.id}`,
      type: "SPEND_POINTS"
    }
  })

  await prisma.userReward.create({
    data: {
      userId: user.id,
      rewardId: reward.id
    }
  })

  await prisma.reward.update({
    where: {id: reward.id},
    data: {available: false}
  })

  return {success: true, message: "Reward obtained successfully!"}
}

export async function addLocation({
  description,
  taxonomy,
  latitude,
  longitude,
  address,
  name
}: {
  description: string
  taxonomy: "ATTRACTION" | "EVENT" | "EXPERIENCE"
  latitude: number
  longitude: number
  address: string | null
  name: string
}) {
  "use server"
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    console.error("User not authenticated")
    return {
      success: false,
      message: "Please login to add a checkpoint."
    }
  }

  const location = await prisma.attraction.create({
    data: {
      name_en: name,
      name_de: name,
      description_en: description,
      description_de: description,
      latitude: latitude,
      longitude: longitude,
      address,
      taxonomy,
      userId: user.id,
      isActive: false,
      points: 0,
      cityId: "clz627elo0000mybntk1bb38g"
    }
  })

  return {success: true, message: "Location added successfully", location}
}

export async function applyForPartnership({
  name,
  description,
  amount,
  email
}: {
  name: string
  description: string
  amount: string
  email: string
}) {
  "use server"

  const partnership = await prisma.partnership.create({
    data: {
      name,
      description,
      amount: amount,
      email: email
    }
  })
  return partnership
}
export async function confirmRewardUsage(formData: FormData) {
  "use server"

  const rewardId = formData.get("rewardId") as string
  if (!rewardId) {
    console.error("Reward ID is required")
    return {
      success: false,
      message:
        "Error occured while confirming reward usage. Please reach support."
    }
  }

  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    console.error("User not authenticated")
    return {
      success: false,
      message: "Please login to confirm reward usage."
    }
  }

  const userReward = await prisma.userReward.findFirst({
    where: {
      userId: user.id,
      rewardId: rewardId,
      isUsed: false
    },
    include: {
      reward: {
        include: {
          city: true
        }
      }
    }
  })

  if (!userReward) {
    console.error("Reward not found or already used")
    return {
      success: false,
      message: "Reward is already used"
    }
  }

  await prisma.userReward.update({
    where: {id: userReward.id},
    data: {isUsed: true}
  })

  revalidatePath("/rewards")
  redirect(`/${userReward.reward.city?.slug || ""}/quests`)
}
