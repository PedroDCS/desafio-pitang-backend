import { Router } from 'express'
import Controller from '../controllers/SchedulingController.js'

const router = Router()

const schedulingController = new Controller()

router.get('/scheduling/getday/:id', schedulingController.getDay.bind(schedulingController))
router.get('/scheduling', schedulingController.index.bind(schedulingController))
router.post('/scheduling', schedulingController.store.bind(schedulingController))
router.get('/scheduling/:id', schedulingController.getOne.bind(schedulingController))
router.delete('/scheduling/:id', schedulingController.remove.bind(schedulingController))
router.put('/scheduling/:id', schedulingController.update.bind(schedulingController))

export default router
