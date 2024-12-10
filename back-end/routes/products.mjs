import dotenv from 'dotenv'
import express from 'express'
import { Router } from 'express'
import {getProductController ,getProductImagesController ,searchProductController} from '../controllers/products-controllers.mjs'
dotenv.config()
const router= Router()
router.get('/api/products/search',searchProductController)
router.get('/api/products/:id',getProductController)
router.get('/api/products/images/:id',getProductImagesController)
export default router