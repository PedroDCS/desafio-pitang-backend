import Joi from 'joi'
import moment from 'moment'
import Controller from './controller.js'
import SchedulingModel from '../models/SchedulingModel.js'

const schema = Joi.object({
  patientName: Joi.string().required(),
  schedulingDate: Joi.date().required(),
  birthDate: Joi.date().required()
})

class SchedulingController extends Controller {
  constructor () {
    super({ mongooseModel: SchedulingModel, validationSchema: schema })
  }

  async store (request, response) {
    const { body } = request

    const validation = schema.validate(body, { abortEarly: false })

    if (validation.error) {
      return response.status(401).json(validation.error.details)
    }
    const today = moment(body.schedulingDate).startOf('day')
    try {
      const registries = await SchedulingModel.find({
        schedulingDate: {
          $gte: today.toDate(),
          $lte: moment(today).endOf('day').toDate()
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

  async getDay (request, response) {
    const { id } = request.params

    const today = moment(id).startOf('day')
    console.log(today)
    try {
      const registries = await SchedulingModel.find({
        schedulingDate: {
          $gte: today.toDate(),
          $lte: moment(today).endOf('day').toDate()
        }
      })
      return response.json({ registries })
    } catch (error) {
      return response.status(400).json({ error: error })
    }
  }
}
export default SchedulingController
