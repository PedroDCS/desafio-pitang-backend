
class Controller {
  constructor ({ mongooseModel, validationSchema }) {
    this.validationSchema = validationSchema
    this.mongooseModel = mongooseModel
  }

  async store (request, response) {
    const { body } = request

    if (this.validationSchema) {
      const validation = this.validationSchema.validate(body, { abortEarly: false })

      if (validation.error) {
        return response.status(401).json(validation.error.details)
      }
    }
    try {
      const registry = await this.mongooseModel.create(body)
      return response.json({ message: 'Data Saved', registry })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error: error })
    }
  }

  async index (request, response) {
    try {
      const data = await this.mongooseModel.find()
      return response.json({ items: data })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error: error })
    }
  }

  async update (request, response) {
    const { id } = request.params
    const { body } = request
    try {
      const registry = await this.mongooseModel.findByIdAndUpdate(id, body, { new: true })
      if (!registry) {
        return response.status(404).json({ message: 'Registry not found' })
      }
      return response.json(registry)
    } catch (error) {
      return response.json(error)
    }
  }

  async remove (request, response) {
    const { id } = request.params
    try {
      const registry = await this.mongooseModel.findById(id)
      if (!registry) {
        return response.status(404).json({ message: 'Registry not found' })
      }
      await registry.remove()

      return response.json({ message: 'Registry Removed' })
    } catch (error) {
      return response.json(error)
    }
  }

  async getOne (request, response) {
    const { id } = request.params
    try {
      const registry = await this.mongooseModel.findById(id)
      if (!registry) {
        return response.status(404).json({ message: 'Registry not found' })
      }
      return response.json(registry)
    } catch (error) {
      return response.json(error)
    }
  }
}

export default Controller
