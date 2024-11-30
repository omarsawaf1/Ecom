import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const authorizedToken = function(req,res,next){
    const authHeader = req.headers['authorization']; 
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).send('no token')
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,data)=>{
        if(err){
            return res.status(403).send(`${err}`)
        }
        req.data=data
        next()
    })
}
export default authorizedToken