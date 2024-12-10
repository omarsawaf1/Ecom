import bcrypt from 'bcrypt'
import {data} from "../shared-resources/data.mjs"
import {user} from '../models/users-models.mjs'
export const hashPassword= async function (request,response, next) {
  try{
      console.log('hi i am here fix the bug please')
      const password = request.body.password
      const salt =  await bcrypt.genSalt()
      const hashPassword= await bcrypt.hash(password,salt)
      // make new attribute to pass to next middleware
      request.hashPassword=hashPassword
      next()
  }catch(err){
    response.status(500).send('cant generate password')
  }
}
export const checkPassword=async function (request,response, next) {
    const password=request.body.password
    if(!password){
        return response.status(400).send('no password is entered')
    }
    if(!request.params.id){
        return response.status(400).send("no id is avaliable")
    }
    const parisedId=parseInt(request.params.id)
    const isUserExist =data.findIndex(user => user.id === parisedId);
    if(isUserExist===-1){
        return res.status(404).send("user not found");
    }
    const hashPassword=data[isUserExist].password
    console.log(hashPassword)
    if(!await bcrypt.compare(password,hashPassword)){
        return response.status(401).send("anta mesh tmam")
    }else{
        console.log('right password')
    }
    next()
}