"use client"

import React, {useState} from "react"
import {getRewardsById} from "../../server/data"
import {confirmRewardUsage} from "@/app/server/index"
import {MuseoModerno} from "next/font/google"
import Header from "@/app/components/Header"
import {toast} from "react-hot-toast"
import CustomToast from "@/app/components/CustomToast"

const museoModerno = MuseoModerno({subsets: ["latin"]})

function ConfirmRewards({searchParams}: {searchParams: {rewardId?: string}}) {
  const [reward, setReward] = useState<any>(null)

  React.useEffect(() => {
    async function fetchReward() {
      if (searchParams.rewardId) {
        const fetchedReward = await getRewardsById(searchParams.rewardId)
        setReward(fetchedReward)
      }
    }
    fetchReward()
  }, [searchParams.rewardId])

  const handleConfirmUsage = async (formData: FormData) => {
    try {
      const response = await confirmRewardUsage(formData)
      toast.custom(<CustomToast message={response.message} type='success' />, {
        position: "top-center",
        duration: 1000
      })
    } catch (error: any) {
      toast.custom(
        <CustomToast
          message={error.message || "An error occurred"}
          type='error'
        />,
        {
          position: "top-center",
          duration: 1000
        }
      )
    }
  }

  if (!reward) {
    return (
      <>
        <Header />
      </>
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
            <strong>Reward:</strong> {reward.name_en}
          </p>
          <p className='mb-4'>
            <strong>Description:</strong> {reward.description_en}
          </p>
          <form action={handleConfirmUsage}>
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
