import { Router } from 'express'
import Controller from '../controllers/SchedulingController.js'

const router = Router()

const schedulingController = new Controller()

router.get('/', schedulingController.index.bind(schedulingController))
router.post('/', schedulingController.store.bind(schedulingController))
router.get('/:id', schedulingController.getOne.bind(schedulingController))
router.get('/getday/:id', schedulingController.getDay.bind(schedulingController))
router.delete('/:id', schedulingController.remove.bind(schedulingController))
router.put('/:id', schedulingController.update.bind(schedulingController))

export default router
