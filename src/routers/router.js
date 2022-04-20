import { Router } from 'express'
import Controller from '../controllers/controller.js'

const router = Router()

const controller = new Controller()

router.get('/', controller.index.bind(controller))
router.post('/', controller.store.bind(controller))
router.get('/:id', controller.getOne.bind(controller))
router.delete('/:id', controller.remove.bind(controller))
router.put('/:id', controller.update.bind(controller))

export default router
