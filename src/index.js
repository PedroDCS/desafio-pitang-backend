import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'

import helmet from 'helmet'
import router from './routers/router.js'
import AuthMiddleware from './middleware/auth.middleware.js'

dotenv.config()
const { DATABASE_URL, PORT } = process.env

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Database Connected...')
  }).catch((error) => {
    console.log(error)
  })

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(cors())

app.use(AuthMiddleware)

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`server running PORT: ${PORT}`)
})
