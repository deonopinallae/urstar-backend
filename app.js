import { config } from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import router from './routers/index.js'

config()

const port = 3001
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api', router)
app.use(express.static('../frontend/build'))

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`server started on a port ${port}`)
	})
})
