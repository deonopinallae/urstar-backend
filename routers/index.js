import express from 'express'
import {authRouter} from './auth.js'
import {productRouter} from './product.js' 
import {userRouter} from './user.js' 

const router = express.Router({ mergeParams: true })

router.use('/', authRouter)
router.use('/products', productRouter)
router.use('/users', userRouter)

export default router