import mongoose from 'mongoose'

const SchedulingDaySchema = new mongoose.Schema({
  patients: { type: [mongoose.SchemaTypes.ObjectId], ref: 'scheduling', required: true }
})

const SchedulingDayModel = mongoose.model('schedulingDay', SchedulingDaySchema)

export default SchedulingDayModel
