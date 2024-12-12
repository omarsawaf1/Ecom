import {Router} from "express"
import {sellerController} from '../controllers/sellers-controllers.mjs'
const router = Router();
router.get('/api/sellers/:id/products',sellerController.getSellerProducts);
router.get('/api/sellers/:id',sellerController.getSellerinfo);
export default router