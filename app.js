import { config } from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import router from './routers/index.js'
import cors from 'cors'

config()

const port = 3001
const app = express()

const corsOptions = {
  // Замените на домен/порт вашего фронтенда!
  origin: 'http://localhost:5137', 
  // ЭТО КРИТИЧЕСКИ ВАЖНО для передачи cookies (credentials)
  credentials: true,
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use('/api', router)
app.use(express.static('../frontend/build'))

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`server started on a port ${port}`)
	})
})
