import {Router} from "express"
import {buyerController} from '../controllers/buyers-controller.mjs'
const router = Router();
router.post('/api/buyers/:id/orders',buyerController.insertBuyerOrders)
router.get('/api/buyers/:id/orders',buyerController.getBuyerOrders)
router.post('/api/buyers/:id/credit-card',buyerController.insertBuyerCreditCard)
router.post('/api/buyers/:id/additional-details',buyerController.insertBuyerAdditionalDetails)
router.get('/api/buyers/:id/credit-card',buyerController.getBuyerCreditCard)
router.get('/api/buyers/:id/additional-details',buyerController.getBuyerAdditionalDetails)
router.get('/api/buyers/:id',buyerController.getBuyerInfo)
export default router