import {ItemCard} from "./ItemCard"
import {Location} from "../lib/types"

type ItemsSliderProps = {
    locations: Location[]
}

const ItemsSlider = ({locations}: ItemsSliderProps) => {
    return (
        <div className='overflow-x-scroll whitespace-nowrap py-4'>
            {locations.map((location) => (
                <div key={location.id} className='inline-block mx-2'>
                    <ItemCard location={location} />
                </div>
            ))}
        </div>
    )
}

export default ItemsSlider
