import dotenv from 'dotenv'
import express from 'express'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import {hashPassword,checkPassword} from "../middlewares/password.mjs"
import authorizedToken from "../middlewares/authorized-token.mjs"
import jwt from 'jsonwebtoken'
import {body,validationResult} from 'express-validator'
dotenv.config()
const router= Router()
router.post('/api/login',(req,res)=>{

    const accessToken= jwt.sign(playLoad,process.env.ACCESS_TOKEN_SECERT,{expiresIn:'30m'})
    res.status(200).json({accessToken:accessToken})
})
router.post('/test',body('user').isEmpty(),(req,res)=>{
    const error=validationResult(req)
    console.log(error)
})
export default router