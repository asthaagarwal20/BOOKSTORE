import express from 'express';
import * as orderController from '../controllers/order.controller';
import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();
router.post('/placeorder',userAuth,orderController.placeorder);

export default router;
