import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../models/userModel.js'
import Controller from './controller.js'
import Joi from 'joi'

dotenv.config()
const { JWT_SECRET } = process.env

const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10)
  const hash = bcryptjs.hashSync(password, salt)
  return hash
}

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  birthDate: Joi.date().required(),
  password: Joi.string()
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})
// $2a$10$kGAaFfafBo1p6Pa162MHJueVuB8QG8KgcQ9vs7798rqrKE5KUdtGW
class UserController extends Controller {
  constructor () {
    super({ mongooseModel: UserModel, validationSchema: schema })
  }

  async store (request, response) {
    const { body } = request
    const validation = schema.validate(body, { abortEarly: false })

    if (validation.error) {
      return response.status(401).json(validation.error.details)
    }

    body.password = hashPassword(body.password)

    try {
      const registries = await UserModel.find({
        email: body.email
      })
      if (registries.length >= 1) {
        return response.status(403).json({ error: 'Usuario já existe' })
      }
    } catch (error) {
      return response.status(400).json({ error: error })
    }
    super.store(request, response)
  }

  async login (request, response) {
    const { email, password } = request.body
    const user = await UserModel.findOne({ email }).lean()
    const validation = loginSchema.validate({ email, password }, { abortEarly: false })

    if (validation.error) {
      return response.status(401).json(validation.error.details)
    }

    if (!user) {
      return response.status(404).json({ message: 'Usuario não encontrado' })
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return response.status(404).json({ message: 'Senha Invalida' })
    }

    delete user.password

    const token = jsonwebtoken.sign({
      id: user._id,
      name: user.name,
      email: user.email
    }, JWT_SECRET, {
      // expiresIn: 120
    })

    return response.json({ token })
  }
}

export default UserController
