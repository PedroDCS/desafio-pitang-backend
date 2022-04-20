import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import helmet from 'helmet'
import router from './routers/router.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(cors())

app.use('/api', router)

app.get('/', (request, response) => {
  response.json({ response: 'Working' })
})

app.listen(PORT, () => {
  console.log(`server running PORT: ${PORT}`)
})
