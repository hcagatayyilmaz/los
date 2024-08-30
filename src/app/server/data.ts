"use server"

import {unstable_cache} from "next/cache"
import {PrismaClient} from "@prisma/client"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {faker} from "@faker-js/faker"

const prisma = new PrismaClient()

export async function getAllRewards() {
  const rewards = await prisma.reward.findMany({
    where: {
      available: true
    }
  })
  return rewards
}

export async function getAttractions(cityId: string, filter: any) {
  "use server"

  const {getUser} = await getKindeServerSession()
  const user = await getUser()
  const now = new Date()

  const whereClause: any = {
    cityId,
    isActive: true,
    OR: [
      {
        startDate: {
          lte: now
        },
        endDate: {
          gte: now
        }
      },
      {
        startDate: null,
        endDate: null
      }
    ]
  }

  if (filter.taxonomy) {
    whereClause.taxonomy = filter.taxonomy.toUpperCase()
  } else if (filter.date) {
    const date = new Date(filter.date)
    whereClause.OR = [
      {
        startDate: {
          lte: date
        },
        endDate: {
          gte: date
        }
      },
      {
        startDate: null,
        endDate: null
      }
    ]
  }

  let attractions = await prisma.attraction.findMany({
    where: whereClause
  })

  // Generate synthetic data
  const syntheticData = await generateSyntheticPlaces(cityId)

  if (user) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId: user.id,
        attractionId: {in: attractions.map((attr) => attr.id)}
      },
      select: {attractionId: true}
    })

    const checkedInAttractionIds = new Set(
      checkIns.map((checkIn) => checkIn.attractionId)
    )

    attractions = attractions.map((attraction) => ({
      ...attraction,
      checkedIn: checkedInAttractionIds.has(attraction.id)
    }))
  } else {
    attractions = attractions.map((attraction) => ({
      ...attraction,
      checkedIn: false
    }))
  }

  console.log("Attractions:", attractions)
  console.log("Synthetic Data:", syntheticData)

  return {attractions, syntheticData}
}

export async function getDBUser(userId: string) {
  "use server"
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return user
}

export async function getMyRewards(id: string) {
  const myRewards = await prisma.userReward.findMany({
    where: {
      userId: id
    },
    include: {
      reward: true
    }
  })
  return myRewards
}

export async function getPopQuiz() {
  const currentDate = new Date()

  const quiz = await prisma.quiz.findFirst({
    where: {
      AND: [
        {
          endDate: {
            gt: currentDate
          }
        },
        {
          active: true
        }
      ]
    }
  })

  return quiz
}

export async function getHideAndSeek() {
  const currentDate = new Date()

  const hideAndSeek = await prisma.hideAndSeek.findFirst({
    where: {
      AND: [
        {
          endDate: {
            gt: currentDate
          }
        },
        {
          active: true
        }
      ]
    },
    include: {
      attraction: true
    }
  })
  return hideAndSeek
}

export async function getBadge() {
  const {getUser} = await getKindeServerSession()
  const user = await getUser()

  try {
    const badges = await prisma.badge.findFirst({
      where: {
        isActive: true,
        isCityBadge: false
      },
      include: {
        attractions: {
          include: {
            attraction: true // Include attraction details, but no check-ins or user-based data
          }
        }
      }
    })

    if (user) {
      const userCheckIns = await prisma.checkIn.findMany({
        where: {
          userId: user.id
        },
        select: {
          attractionId: true
        }
      })

      const checkedInAttractionIds = new Set(
        userCheckIns.map((checkIn) => checkIn.attractionId)
      )

      if (badges && badges.attractions) {
        badges.attractions = badges.attractions.map((attraction) => ({
          ...attraction,
          checkedIn: checkedInAttractionIds.has(attraction.attractionId)
        }))
      }
    }

    return badges
  } catch (error) {
    console.error("Error fetching active badges:", error)
    throw new Error("Could not fetch active badges")
  }
}

export async function getBadgeStatus(attractionIds: string[]) {
  const {getUser} = await getKindeServerSession()
  const user = await getUser()

  if (!user) {
    throw new Error("Please login to get your badge!")
  }

  const checkedIn = await prisma.checkIn.findMany({
    where: {
      userId: user.id,
      attractionId: {
        in: attractionIds
      }
    },
    select: {
      attractionId: true
    }
  })

  return checkedIn.map((checkIn) => checkIn.attractionId)
}

export async function getRewardsById(rewardId: string) {
  "use server"
  const reward = await prisma.reward.findUnique({
    where: {
      id: rewardId
    }
  })

  return reward
}
export const getAllPlaces = unstable_cache(
  async () => {
    const locations = await prisma.attraction.findMany({
      where: {
        isActive: true
      }
    })
    return locations
  },
  ["all-places"],
  {revalidate: 600}
)

export async function getPlaceDetails(placeId: string) {
  const place = await prisma.attraction.findUnique({
    where: {
      id: placeId,
      isActive: true
    }
  })

  if (!place) {
    return null
  }

  return place
}

export async function getCityBadgeByCityName(cityName: string) {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const cityBadge = await prisma.badge.findFirst({
    where: {
      city: {
        slug: cityName
      }
    },
    include: {
      city: true
    }
  })

  if (!cityBadge) {
    return null
  }

  let totalCheckIns = 0
  if (user) {
    totalCheckIns = await prisma.checkIn.count({
      where: {
        attraction: {
          cityId: cityBadge.cityId ?? ""
        },
        userId: user.id
      }
    })
  }

  return {
    ...cityBadge,
    totalCheckIns
  }
}

const generateSyntheticPlaces = unstable_cache(
  async (cityId: string) => {
    const city = await prisma.city.findUnique({
      where: {id: cityId},
      select: {centerLat: true, centerLng: true}
    })

    if (!city || !city.centerLat || !city.centerLng) {
      console.log(
        "City not found or missing coordinates. Skipping synthetic data generation."
      )
      return []
    }

    const radius = 0.02 // Approximately 10km radius
    return Array.from({length: 50}, () => {
      const angle = Math.random() * 2 * Math.PI
      const distance = Math.sqrt(Math.random()) * radius
      const lat = city.centerLat && city.centerLat + distance * Math.cos(angle)
      const lng = city.centerLng && city.centerLng + distance * Math.sin(angle)

      return {
        id: faker.string.uuid(),
        name_en: faker.company.name(),
        name_de: faker.company.name(),
        latitude: parseFloat(lat!.toFixed(6)),
        longitude: parseFloat(lng!.toFixed(6)),
        points: 10,
        cityId: cityId,
        description_en: faker.lorem.sentence(),
        description_de: faker.lorem.sentence(),
        isActive: true,
        taxonomy: faker.helpers.arrayElement([
          "ATTRACTION",
          "EVENT",
          "EXPERIENCE"
        ]),
        isSynthetic: true
      }
    })
  },
  ["synthetic-places"],
  {revalidate: 86400} // 24 hours in seconds
)
