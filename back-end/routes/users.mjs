import { Router } from "express";
import {hashPassword,checkPassword} from "../middlewares/password.mjs"
import {data} from "../shared-resources/data.mjs"
const router= Router()
//query parameters
router.get('/api/users', (req, res) => {
    const userName = req.query.name
    if (userName != undefined) {
        console.log(data.filter((user) => user.userName === userName))
        return res.status(200).send(data.filter((user) => user.userName === userName))
    }
    res.status(200).send(data)
})

//routes parameters
router.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    const foundUser = data.find((user) => user.id === parseInt(id))
    if (foundUser) {
        res.status(200).send(foundUser)
    } else {
        res.status(404).send("user not found")
    }
})

//post 

router.post('/api/users', hashPassword ,(req, res) => {
    const { userName, id , password } = req.body;
    const parisedId = parseInt(id);
    if(!password){
        res.status(400).send("password must be a number");
        return;
    }  
    if (isNaN(parisedId)) {
        res.status(400).send("id must be a number");
        return;
    }
    const isUserExist = data.some(user => user.id === parisedId   || user.userName === userName);
    if (isUserExist) {
        res.status(400).send(`user with id ${id} already exists`);
    } else {
        data.push({ userName, id:parisedId, hashPassword: req.hashPassword});
        res.status(201).send("User added successfully");
    }

    console.log(data);
});
// put
router.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const {userName,salary} = req.body
    console.log(id,userName,salary)
    if (!id || !userName || !salary) {
        return res.status(400).send("id, userName and salary are required");
    }
    const parisedId = parseInt(id);
    const isUserExist =data.findIndex(user => user.id === parisedId);
    if(isUserExist===-1){
        return res.status(404).send("user not found");
    }
    const parisedsalary = parseInt(salary);
    if(isNaN(parisedsalary)){
        return res.status(400).send("salary must be a number");
    }
    data[isUserExist].userName = userName;
    data[isUserExist].salary = parisedsalary;
    res.status(200).send("user updated successfully");
})  
// patch
router.patch('/api/users/:id',checkPassword,(req,res)=>{
    const {id} =req.params
    const {userName,salary} =req.body
    if(!id){
       return res.status(400).send('message must enter all data')
    }
    const parisedId = parseInt(id);
    if(parisedId==NaN){
       return  res.status(400).send('message must be number id')
    }

    const isUserExist =data.findIndex(user => user.id === parisedId);
    if(isUserExist===-1){
        return res.status(404).send("user not found");
    }

    if(salary){
        const parisedsalary = parseInt(salary);
        data[isUserExist].salary=parisedsalary
        if(isNaN(parisedsalary)){
            return res.status(400).send("salary must be a number");
        }
    }
    if(userName){
        data[isUserExist].userName=userName
    }
    if(req.password){
        data[isUserExist].password=req.password
    }
    console.log(data)
    return res.status(200).send('user update successfully')
})
// delete
router.delete('/api/users/:id',(req,res)=>{
    const id= req.params.id
    if(!id){
        return res.status(400).send('invaild userid')
    }
    const parisedId= parseInt(id)
    console.log(typeof(parisedId))
    if(parisedId==NaN){
        return res.status(400).send('id is not number')
    }
    const isUserExist=data.findIndex(ele => ele.id === parisedId)
    console.log(isUserExist)
    if(isUserExist===-1){
       return  res.status(400).send('user not found')
    }
    data.splice(isUserExist,1)
    console.log(data)
    return res.status(200).send('user is deleted')
})

export default router