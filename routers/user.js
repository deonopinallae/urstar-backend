import express from 'express'
import {getUsers, getRoles, updateUser, deleteUser} from '../controllers/index.js'
import {authenticated, hasRole} from '../middlewars/index.js'
import {mapUser} from '../helpers/index.js'
import {ROLES} from '../constants/roles.js'

export const userRouter = express.Router({ mergeParams: true })

userRouter.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) })
})

userRouter.get('/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles();

  res.send({ data: roles })
})

userRouter.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId
  })

  res.send({ data: mapUser(newUser) })
})

userRouter.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id)

  res.send({ error: null })
})
