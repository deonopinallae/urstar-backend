import { verify } from '../helpers/index.js'
import { User } from '../models/index.js'

export const authenticated = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) return res.status(401).json({ error: 'JWT must be provided' })

	try {
		const tokenData = verify(token)
		const user = await User.findById(tokenData.id)
		if (!user) return res.status(401).json({ error: 'User not found' })
		req.user = user
		next()
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token' })
	}
}
