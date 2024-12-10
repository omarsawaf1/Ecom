import dotenv from 'dotenv'
import express from 'express'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import {hashPassword,checkPassword} from "../middlewares/password.mjs"
import authorizedToken from "../middlewares/authorized-token.mjs"
import jwt from 'jsonwebtoken'
import {body,validationResult} from 'express-validator'
import usersVaildationScheme from '../vaildation-shcema/users-shcema.mjs'
import {signupController,loginController}from '../controllers/users-controllers.mjs'
dotenv.config()
const router= Router()
// router.post('/api/login',(req,res)=>{

//     const accessToken= jwt.sign(playLoad,process.env.ACCESS_TOKEN_SECERT,{expiresIn:'30m'})
//     res.status(200).json({accessToken:accessToken})
// })
router.post('/api/signup',signupController)
router.post('/api/login',loginController)
// router.post('/test',usersVaildationScheme,(req,res)=>{
//     const error=validationResult(req)
//     if(!error.isEmpty()){
//         return res.status(400).json({error:error.array()})
//     }else{
//         return res.status(200).send('all good pro')
//     }
// })
export default router