import mongoose from "mongoose"

const SyntheticPlaceSchema = new mongoose.Schema({
  name_en: String,
  name_de: String,
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

  points: Number,
  description_en: String,
  description_de: String,
  isActive: Boolean,
  taxonomy: {
    type: String,
    enum: ["ATTRACTION", "EVENT", "EXPERIENCE"]
  },
  isSynthetic: Boolean,
  cityId: String,
  createdAt: {type: Date, default: Date.now, expires: "24h"}
})

// Create a 2dsphere index on the location field
SyntheticPlaceSchema.index({location: "2dsphere"})

// Create an index on cityId for faster queries
SyntheticPlaceSchema.index({cityId: 1})

const SyntheticPlace =
  mongoose.models.SyntheticPlace ||
  mongoose.model("SyntheticPlace", SyntheticPlaceSchema)

export default SyntheticPlace
