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
    res.status(200).sendFile(path.join(__dirname, '../../Frontend/HTML/home.html'));
})
router.get('/aboutus', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../Frontend/HTML/aboutus.html'));
})
router.get('/clothes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../Frontend/HTML/clothes.html'));
})
router.get('/deals', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../Frontend/HTML/deals.html'));
})
router.get('/supermarket', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../Frontend/HTML/supermarket.html'));
})
router.get('/signin', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../Frontend/HTML/signin.html'));
})
router.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../Frontend/HTML/signup.html'));
})

export default router
