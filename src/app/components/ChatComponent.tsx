import React, {useState} from "react"
import Image from "next/image"
import {CiCamera} from "react-icons/ci"

interface ChatComponentProps {
  locationId: string
}

const ChatComponent: React.FC<ChatComponentProps> = ({locationId}) => {
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleSendMessage = () => {
    // Implement send message logic here
    console.log("Sending message:", message, "for location:", locationId)
    setMessage("")
    setImage(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <div className=' rounded-lg'>
      <div className='flex items-center '>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Ask anything'
          className='flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customYellow'
        />
        <label
          htmlFor='image-upload'
          className='cursor-pointer border-l-2 text-customYellow px-4 py-2 border border-gray-300'
        >
          <CiCamera className='w-6 h-6' />
          <input
            id='image-upload'
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
          />
        </label>
        <button
          onClick={handleSendMessage}
          className='bg-customYellow text-white px-4 p-2 border border-customYellow rounded-r-lg hover:bg-customYellow focus:outline-none focus:ring-2 focus:ring-customYellow'
        >
          Ask
        </button>
      </div>
      {image && (
        <div className='mb-4'>
          <Image
            src={URL.createObjectURL(image)}
            alt='Uploaded image'
            width={100}
            height={100}
            className='rounded-lg'
          />
        </div>
      )}
    </div>
  )
}

export default ChatComponent
