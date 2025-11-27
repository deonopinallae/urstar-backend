import { config } from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import router from './routers/index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3001

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: ['https://urstar.vercel.app', 'https://urstar.onrender.com'],
    credentials: true
  })
)

app.use('/api', router)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`server started on a port ${port}`)
	})
})
