// start up the server and listen on port 
import dotenv from 'dotenv'
import app from './app.mjs'
dotenv.config()
const port= process.env.PORT_SERVER || "3000"
app.listen(port,()=>{
    console.log(`listening on ${port}`)
})
