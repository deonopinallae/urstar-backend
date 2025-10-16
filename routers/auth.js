import { register, login } from '../controllers/user.js'
import { mapUser } from '../helpers'
import express from 'express'

export const authRouter = express.Router({ mergeParams: true })

authRouter.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password)
		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		})
	} catch (e) {
		res.send({ error: e.message || 'Unknow error' })
	}
})
authRouter.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password)

		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		})
	} catch (e) {
		res.send({ error: e.message || 'Unknow error' })
	}
})

authRouter.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send({})
})
