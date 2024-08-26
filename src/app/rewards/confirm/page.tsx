import React from "react"
import {getRewardsById} from "../../server/data"
import {confirmRewardUsage} from "@/app/server/index"
import {MuseoModerno} from "next/font/google"
import Header from "@/app/components/Header"

const museoModerno = MuseoModerno({subsets: ["latin"]})

async function ConfirmRewards({searchParams}: {searchParams: {id?: string}}) {
  const id = searchParams.id

  if (!id) {
    return (
      <>
        <Header />
        <div className={museoModerno.className}>Invalid reward ID</div>
      </>
    )
  }

  const reward = await getRewardsById(id)

  if (!reward) {
    return (
      <>
        <Header />
        <div className={museoModerno.className}>Reward not found</div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className='flex justify-center'>
        <div
          className={`${museoModerno.className} max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-2xl border-b-2 border`}
        >
          <h1 className='text-2xl font-bold mb-4'>Confirm Reward Usage</h1>
          <p className='mb-2'>
            <strong>Reward:</strong> {reward.name_en}
          </p>
          <p className='mb-4'>
            <strong>Description:</strong> {reward.description_en}
          </p>
          <form action={confirmRewardUsage}>
            <input type='hidden' name='rewardId' value={reward.id} />
            <button
              type='submit'
              className='w-full bg-black text-white py-2 px-4 rounded-full hover:bg-customYellow transition duration-300'
            >
              Confirm Usage
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ConfirmRewards
