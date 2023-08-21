import { Schema, model } from "mongoose"

const mediaSchema = new Schema({
  mediaPath: {
    type: String,
    required: true,
  },
  actorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  altText: {
    type: String,
  }
}, { timestamps: true })

export default model('Media', mediaSchema);