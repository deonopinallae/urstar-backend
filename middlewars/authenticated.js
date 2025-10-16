import { verify } from "jsonwebtoken"
import { User } from "../models"

export const authenticated = async(req, res, next) => {
    const tokenData = verify(req.cookies.token)
    const user = await User.findOne({_id: tokenData.id}) 
    if(!user){
        res.send({error: 'authenticated user not found'})
        return
    }
    req.user = user
    next()
}