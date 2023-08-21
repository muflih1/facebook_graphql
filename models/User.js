import { Schema, model } from "mongoose"

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  sex: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer-Not-To-Say'],
    required: true,
  },
  birthDay: {
    day: { type: String },
    month: { type: String },
    year: { type: String },
  },
}, { timestamps: true })

export default model('User', userSchema);