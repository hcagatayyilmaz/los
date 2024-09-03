import mongoose, {Document, Model} from "mongoose"

export interface ISyntheticPlace extends Document {
  name_en: string
  name_de: string
  location: {
    type: string
    coordinates: [number, number]
  }
  points: number
  description_en: string
  description_de: string
  isActive: boolean
  taxonomy: "ATTRACTION" | "EVENT" | "EXPERIENCE"
  isSynthetic: boolean
  checkedIn: boolean
  cityId: string
  createdAt: Date
}

const SyntheticPlaceSchema = new mongoose.Schema({
  name_en: {type: String, required: true},
  name_de: {type: String, required: true},
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  points: {type: Number, required: true},
  description_en: {type: String, required: true},
  description_de: {type: String, required: true},
  isActive: {type: Boolean, required: true},
  taxonomy: {
    type: String,
    enum: ["ATTRACTION", "EVENT", "EXPERIENCE"],
    required: true
  },
  checkedIn: {type: Boolean, default: false, required: true},
  isSynthetic: {type: Boolean, required: true},
  cityId: {type: String, required: true},
  createdAt: {type: Date, default: Date.now, expires: "24h"}
})

// Create a 2dsphere index on the location field
SyntheticPlaceSchema.index({location: "2dsphere"})

// Create an index on cityId for faster queries
SyntheticPlaceSchema.index({cityId: 1})

const SyntheticPlace: Model<ISyntheticPlace> =
  mongoose.models.SyntheticPlace ||
  mongoose.model<ISyntheticPlace>("SyntheticPlace", SyntheticPlaceSchema)

export default SyntheticPlace
