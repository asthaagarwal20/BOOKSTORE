import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();
router.post(
  '/addtowishlist/:bookId',
  userAuth,
  wishlistController.addItemTowishlist
);
router.get('/checkwishlist', userAuth, wishlistController.checkwishlist);
router.get(
  '/removefromwishlist/:bookId',
  userAuth,
  wishlistController.removefromwishlist
);

export default router;
