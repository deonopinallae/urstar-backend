import jwt from 'jsonwebtoken'

const getJwtSecret = () => {
	const secret = process.env.JWT_SECRET
	if (!secret) {
		throw new Error(
			'JWT_SECRET is not defined. Check your .env setup and module loading order.',
		)
	}
	return secret
}

export const generateToken = (data) => {
	const sign = getJwtSecret()
	return jwt.sign(data, sign, { expiresIn: '30d' })
}

export const verify = (token) => {
	const sign = getJwtSecret()
	return jwt.verify(token, sign)
}
