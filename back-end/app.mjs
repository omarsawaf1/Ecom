// middleware and routes

import express from 'express'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import staticFilesRouter from './routes/static-files.mjs'
import pagesRouter from './routes/pages.mjs'
import usersRouter from './routes/users.mjs'
import loginSignup from './routes/login-signup.mjs'
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
app.use(loginSignup)

let data = [
    { userName: 'sara', id: 1, salary: 1000 },
    { userName: 'ali', id: 2, salary: 2000 },
    { userName: 'mohamed', id: 3, salary: 3000 }
]


console.log('working')
console.log(__dirname)

export default app

