import {MuseoModerno} from "next/font/google"
import Header from "@/app/components/Header"
import {PrismaClient} from "@prisma/client"
import ConfirmRewardForm from "@/app/components/ConfirmRewardForm"

const prisma = new PrismaClient()
const museoModerno = MuseoModerno({subsets: ["latin"]})

async function ConfirmRewards({
  searchParams
}: {
  searchParams: {rewardId?: string; userId?: string}
}) {
  // Fetch user reward directly from prisma
  const userReward = await prisma.userReward.findFirst({
    where: {
      userId: searchParams.userId,
      rewardId: searchParams.rewardId
    },
    include: {
      reward: true
    }
  })

  if (!searchParams.rewardId) {
    return (
      <>
        <Header />
        <div className='flex justify-center'>
          <div
            className={`${museoModerno.className} max-w-md w-full mx-auto p-6 border`}
          >
            <p className='text-center'>
              No reward found. Please reach support@los.city
            </p>
          </div>
        </div>
      </>
    )
  }

  if (!searchParams.userId) {
    return (
      <>
        <Header />
        <div className='flex justify-center'>
          <div
            className={`${museoModerno.className} max-w-md w-full mx-auto p-6 border`}
          >
            <p className='text-center'>
              No reward found. Please reach support@los.city
            </p>
          </div>
        </div>
      </>
    )
  }

  if (!userReward) {
    return (
      <div className='h-dvh'>
        <Header />
        <div className='flex justify-center items-center'>
          <div
            className={`${museoModerno.className} max-w-md w-full mx-auto p-6 `}
          >
            <p className='text-center'>
              No reward found.
              <br /> Please reach <strong>support@los.city</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (userReward.isUsed) {
    return (
      <div className='h-dvh'>
        <Header />
        <div className='flex justify-center items-center '>
          <div
            className={`${museoModerno.className} max-w-md w-full mx-auto p-6 `}
          >
            <p className='text-center'>Reward already used</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className='flex justify-center'>
        <div
          className={`${museoModerno.className} max-w-md w-full mx-auto p-6 border`}
        >
          <h1 className='text-2xl font-bold mb-4'>Confirm Reward Usage</h1>
          <p className='mb-2'>
            <strong>Reward:</strong> {userReward.reward.name_en}
          </p>
          <p className='mb-4'>
            <strong>Description:</strong> {userReward.reward.description_en}
          </p>
          <ConfirmRewardForm
            rewardId={userReward.rewardId}
            userId={userReward.userId}
          />
        </div>
      </div>
    </>
  )
}

export default ConfirmRewards
