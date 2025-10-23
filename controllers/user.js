import bcrypt from 'bcrypt'
import { ROLES } from '../constants/roles.js'
import { User } from '../models/index.js'
import { generateToken } from '../helpers/index.js'

//register
export const register = async (login, password) => {
    const userCheck = await User.findOne({login})
    if(userCheck){
        throw new Error('user already registed')
    }
	if (!password) {
		throw new Error('passwors is empty')
	}
	const passwordHash = await bcrypt.hash(password, 10)
	const user = await User.create({ login, password: passwordHash })
	const token = generateToken({ id: user.id })

	return { user, token }
}

//login
export const login = async (login, password) => {
	const user = await User.findOne({ login })

	if (!user) {
		throw new Error('user not found')
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password)

	if (!isPasswordMatch) {
		throw new Error('wrong password')
	}

	const token = generateToken({ id: user.id })
	return { token, user }
}

//get users
export const getUsers = () => {
	return User.find()
}

//get roles
export const getRoles = () => {
	return [
		{ id: ROLES.ADMIN, name: 'admin' },
		{ id: ROLES.ADMIN, name: 'user' },
		{ id: ROLES.GUEST, name: 'guest' },
	]
}

//delete
export const deleteUser = (id) => {
	return User.deleteOne({ _id: id })
}

//edit (roles)
export const updateUser = (id, userData) => {
	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
}
