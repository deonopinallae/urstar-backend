import mongoose from "mongoose"
import {ROLES} from '../constants/roles.js'

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: ROLES.GUEST
    }
}, {timestamps: true})

export const User = mongoose.model('User', UserSchema)

