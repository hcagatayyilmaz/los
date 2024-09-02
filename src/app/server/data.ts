"use server"

import {unstable_cache} from "next/cache"
import {PrismaClient} from "@prisma/client"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {faker} from "@faker-js/faker"
import mongoose from "mongoose"
import SyntheticPlace from "../../../mongodb/schema"
import {getRedisClient, closeRedisConnection} from "../../../redis/redis"

const prisma = new PrismaClient()

export async function getRewardsByCity(slug: string) {
  const city = await prisma.city.findUnique({
    where: {
      slug: slug
    }
  })
  const rewards = await prisma.reward.findMany({
    where: {
      available: true,
      cityId: city?.id
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
        AND: [{startDate: {lte: now}}, {endDate: {gte: now}}]
      },
      {
        startDate: null,
        endDate: null
      },
      {
        startDate: null,
        endDate: {gte: now}
      }
    ]
  }

  if (filter.taxonomy) {
    whereClause.taxonomy = filter.taxonomy.toUpperCase()
  } else if (filter.date) {
    const date = new Date(filter.date)
    whereClause.OR = [
      {
        AND: [{startDate: {lte: date}}, {endDate: {gte: date}}]
      },
      {
        startDate: null,
        endDate: null
      },
      {
        startDate: null,
        endDate: {gte: date}
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

  // console.log("Attractions:", attractions)
  // console.log("Synthetic Data:", syntheticData)

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

export async function getPopQuiz({slug}: {slug: string}) {
  const currentDate = new Date()

  const city = await prisma.city.findUnique({
    where: {
      slug: slug
    }
  })

  const quiz = await prisma.quiz.findFirst({
    where: {
      cityId: city?.id,
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

export async function getHideAndSeek({slug}: {slug: string}) {
  const currentDate = new Date()
  const city = await prisma.city.findUnique({
    where: {
      slug: slug
    }
  })

  const hideAndSeek = await prisma.hideAndSeek.findFirst({
    where: {
      cityId: city?.id,
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

export async function getBadge({slug}: {slug: string}) {
  const {getUser} = await getKindeServerSession()
  const user = await getUser()
  const city = await prisma.city.findUnique({
    where: {
      slug: slug
    }
  })

  try {
    const badges = await prisma.badge.findFirst({
      where: {
        isActive: true,
        isCityBadge: false,
        cityId: city?.id
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

export async function generateSyntheticPlaces(cityId: string) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI as string)
    }

    // Check if we already have synthetic places for this city
    let syntheticPlaces = await SyntheticPlace.find({cityId})

    if (syntheticPlaces.length > 0) {
      // Convert MongoDB documents to plain JavaScript objects and serialize fields
      return syntheticPlaces.map((place) => {
        const plainObject = place.toObject()
        return {
          id: plainObject._id.toString(), // Normalize the id field
          name_en: plainObject.name_en,
          name_de: plainObject.name_de,
          points: plainObject.points,
          description_en: plainObject.description_en,
          description_de: plainObject.description_de,
          isActive: plainObject.isActive,
          taxonomy: plainObject.taxonomy,
          isSynthetic: plainObject.isSynthetic,
          cityId: plainObject.cityId,
          createdAt: plainObject.createdAt.toISOString(),
          latitude: plainObject.location.coordinates[1],
          longitude: plainObject.location.coordinates[0]
        }
      })
    }

    // If not, generate new synthetic places
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
    const newSyntheticData = Array.from({length: 20}, () => {
      const angle = Math.random() * 2 * Math.PI
      const distance = Math.sqrt(Math.random()) * radius
      const lat = city.centerLat! + distance * Math.cos(angle)
      const lng = city.centerLng! + distance * Math.sin(angle)

      return new SyntheticPlace({
        cityId: cityId,
        name_en: faker.company.name(),
        name_de: faker.company.name(),
        location: {
          type: "Point",
          coordinates: [parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))]
        },
        points: 10,
        description_en: faker.lorem.sentence(),
        description_de: faker.lorem.sentence(),
        isActive: true,
        taxonomy: faker.helpers.arrayElement([
          "ATTRACTION",
          "EVENT",
          "EXPERIENCE"
        ]),
        isSynthetic: true,
        createdAt: new Date() // This field is used for TTL
      })
    })

    // Save the new synthetic places to MongoDB
    await SyntheticPlace.insertMany(newSyntheticData)

    // Convert MongoDB documents to plain JavaScript objects and serialize fields
    return newSyntheticData.map((place) => {
      const plainObject = place.toObject()
      return {
        id: plainObject._id.toString(), // Normalize the id field
        name_en: plainObject.name_en,
        name_de: plainObject.name_de,
        points: plainObject.points,
        description_en: plainObject.description_en,
        description_de: plainObject.description_de,
        isActive: plainObject.isActive,
        taxonomy: plainObject.taxonomy,
        isSynthetic: plainObject.isSynthetic,
        cityId: plainObject.cityId,
        createdAt: plainObject.createdAt.toISOString(),
        latitude: plainObject.location.coordinates[1],
        longitude: plainObject.location.coordinates[0]
      }
    })
  } catch (error) {
    console.error("Error in generateSyntheticPlaces:", error)
    return [] // Return an empty array if any error occurs
  }
}

export const getAllActiveCities = unstable_cache(
  async () => {
    const cities = await prisma.city.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        name: "asc" // Order by name or any other field if needed
      }
    })
    return cities
  },
  ["all-active-cities"],
  {revalidate: 86400} // Revalidate every 24 hours
)
