import Joi from 'joi'
import Controller from './controller.js'
import SchedulingModel from '../models/SchedulingModel.js'
import { endOfDay, startOfDay, startOfHour, endOfHour, eachHourOfInterval } from 'date-fns'

const schema = Joi.object({
  patientName: Joi.string().required(),
  schedulingDate: Joi.date().required(),
  birthDate: Joi.date().required()
})

class SchedulingController extends Controller {
  constructor() {
    super({ mongooseModel: SchedulingModel, validationSchema: schema })
  }

  async store(request, response) {
    const { body } = request
    const validation = schema.validate(body, { abortEarly: false })
    if (validation.error) {
      return response.status(401).json(validation.error.details)
    }
    const today = startOfHour(new Date(body.schedulingDate))
    try {
      const registries = await SchedulingModel.find({
        schedulingDate: {
          $gte: today,
          $lte: endOfHour(new Date(body.schedulingDate))
        }
      })
      if (registries.length >= 2) {
        return response.status(403).json({ error: 'Horario Lotado' })
      }
    } catch (error) {
      return response.status(400).json({ error: error })
    }
    super.store(request, response)
  }

  async getDay(request, response) {
    const { id } = request.params
    try {
      const registries = await SchedulingModel.find({
        schedulingDate: {
          $gte: startOfDay(new Date(id)),
          $lte: endOfDay(new Date(id)),
        }
      })
      return response.json({ items: registries })
    } catch (error) {
      return response.status(400).json({ error: error })
    }
  }
}
export default SchedulingController
