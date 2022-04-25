import mongoose from 'mongoose'

const UseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
  password: String
})

const UserModel = mongoose.model('user', UseSchema)

export default UserModel
