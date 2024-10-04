import React from "react"
import {Location} from "../lib/types" // Ensure you have the correct path to your Location type
import ItemCardList from "./ItemCardList"

type ListProps = {
  locations: Location[] // Expecting an array of Location objects as props
}

const List: React.FC<ListProps> = ({locations}) => {
  return (
    <div className='px-4 w-full h-full absolute top-32'>
      <ul className='space-y-2'>
        {locations.map((location) => (
          <ItemCardList location={location} key={location.id} />
        ))}
      </ul>
    </div>
  )
}

export default List
