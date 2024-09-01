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
  isSynthetic: Boolean
})

SyntheticPlaceSchema.index({location: "2dsphere"})

export default mongoose.models.SyntheticPlace ||
  mongoose.model("SyntheticPlaceSchema", SyntheticPlaceSchema)
