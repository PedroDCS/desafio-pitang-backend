import mongoose from 'mongoose'

const SchedulingSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  schedulingDate: { type: Date, required: true },
  birthDate: { type: Date, required: true }
}, {
  timestamps: true
})

const SchedulingModel = mongoose.model('scheduling', SchedulingSchema)

export default SchedulingModel
