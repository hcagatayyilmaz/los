import React from "react"
import QRCode from "react-qr-code"

interface QRCodeComponentProps {
  id: string
  userId?: string
}

function QRCodeComponent({id, userId}: QRCodeComponentProps) {
  console.log("USER ID: ", userId)
  return (
    <div className='mt-4' style={{display: "flex", justifyContent: "center"}}>
      <QRCode
        value={`${process.env.NEXT_PUBLIC_LOS_URL}/rewards/confirm?rewardId=${id}&userId=${userId}`}
      />
    </div>
  )
}

export default QRCodeComponent
