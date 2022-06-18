import express from 'express';
const router = express.Router();
import bookRoute from './book.route';

import userRoute from './user.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import orderRoute from './order.route';
import userinfoRoute from './userinfo.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/book',bookRoute);
  router.use('/cart',cartRoute);
  router.use('/wishlist', wishlistRoute);
  router.use('/order', orderRoute);
  router.use('/userinfo', userinfoRoute); 

  return router;
};

export default routes;
