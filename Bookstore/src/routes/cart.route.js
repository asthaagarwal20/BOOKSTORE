import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/addtocart/:bookId', userAuth, cartController.addItemToCart);
router.get('/checkcart',userAuth, cartController.checkcart);
router.get('/removebook/:bookId',userAuth, cartController.removebook);
router.put('/updatecart/:bookId',userAuth, cartController.updatecart);

export default router;
