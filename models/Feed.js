import { Schema, model } from "mongoose";

const feedSchema = new Schema(
  {
    text: {
      type: String,
    },
    attachments: [
      {
        photo: {
          type: Schema.Types.ObjectId,
          ref: "Media",
          required: false,
        },
      },
    ],
    actorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);

export default model("Feed", feedSchema);
