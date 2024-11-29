// middleware and routes

import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import staticFilesRouter from './routes/static-files.mjs'
import pagesRouter from './routes/pages.mjs'
import usersRouter from './routes/users.mjs'

// dirname, filename is not supported in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
dotenv.config()

// middleware to parse json
app.use(express.json());

// routes
app.use(usersRouter)
app.use(pagesRouter)
app.use(staticFilesRouter)

let data = [
    { userName: 'sara', id: 1, salary: 1000 },
    { userName: 'ali', id: 2, salary: 2000 },
    { userName: 'mohamed', id: 3, salary: 3000 }
]

app.get('/testerrors', (req, res) => {
    console.log('test1 complete')
    console.log('test2 complete')
    res.status(200).send('Errors tested successfully')
})

console.log('working')
console.log(__dirname)

export default app

