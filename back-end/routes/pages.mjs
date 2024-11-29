//importing the required modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync } from 'fs';

//dirname,filename is not supported in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../front-end/html/index.html'));
})
router.get('/aboutus', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../front-end/html/aboutus.html'));
})
router.get('/clothes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../front-end/html/clothes.html'));
})
router.get('/deals', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../front-end/html/deals.html'));
})
router.get('/supermarket', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../front-end/html/supermarket.html'));
})
router.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../front-end/html/login.html'));
})

router.get('/electronics', (req, res) => { 
    res.status(200).sendFile(path.join(__dirname, '../../front-end/html/electronics.html'));    
})
export default router
