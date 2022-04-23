import { Router } from 'express'
import UserController from '../controllers/userController.js'

const router = Router()

const userController = new UserController()

router.post('/login', userController.login.bind(userController))
router.get('/user', userController.index.bind(userController))
router.get('/user/:id', userController.getOne.bind(userController))
router.post('/user', userController.store.bind(userController))
router.put('/user/:id', userController.update.bind(userController))
router.delete('/user/:id', userController.remove.bind(userController))

export default router
