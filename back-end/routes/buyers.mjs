import {Router} from "express"
import {buyerController} from '../controllers/buyers-controller.mjs'
const router = Router();
router.post('/api/buyers/:id/orders',buyerController.insertBuyerOrders)
router.get('/api/buyers/:id/orders',buyerController.getBuyerOrders)
export default router