
//importing the required modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync } from 'fs';

//dirname,filename is not supported in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

//serving static files like js,css and images
router.use('/javascript', express.static(path.join(__dirname, '../../front-end/javascript')));
router.use('/CSS', express.static(path.join(__dirname, '../../front-end/css')));
router.use('/pictures', express.static(path.join(__dirname, '../../front-end/pictures')));

export default router;
