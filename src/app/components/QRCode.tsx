import React from "react"
import QRCode from "react-qr-code"

interface QRCodeComponentProps {
    id: string
}

function QRCodeComponent({id}: QRCodeComponentProps) {
    return (
        <div className='mt-4' style={{display: "flex", justifyContent: "center"}}>
            <QRCode value={`https://localhost:3000/rewards/confirm?rewardId=${id}`} />
        </div>
    )
}

export default QRCodeComponent
