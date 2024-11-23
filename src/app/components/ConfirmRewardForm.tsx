"use client"
import {confirmRewardUsage} from "@/app/server/index"
import {toast} from "react-hot-toast"
import CustomToast from "./CustomToast" // Ensure correct path to the CustomToast component

interface ConfirmRewardFormProps {
  rewardId: string
  userId: string
}

function ConfirmRewardForm({rewardId, userId}: ConfirmRewardFormProps) {
  const handleSubmit = async (formData: FormData) => {
    const response = await confirmRewardUsage(formData)

    if (response.success) {
      toast.custom(<CustomToast message={response.message} type='success' />, {
        position: "top-center",
        duration: 1000
      })
    } else {
      toast.custom(<CustomToast message={response.message} type='error' />, {
        position: "top-center",
        duration: 1000
      })
    }
  }

  return (
    <form action={handleSubmit}>
      <input type='hidden' name='rewardId' value={rewardId} />
      <input type='hidden' name='userId' value={userId} />
      <button
        type='submit'
        className='w-full bg-black text-white py-2 px-4 rounded-full hover:bg-customYellow transition duration-300'
      >
        Confirm Usage
      </button>
    </form>
  )
}

export default ConfirmRewardForm
