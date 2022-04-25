import { Router } from 'express'
import schedulingRouter from './schedulingRouter.js'
import UserRouter from './userRouter.js'

const router = Router()
router.use(schedulingRouter)
router.use(UserRouter)

export default router
