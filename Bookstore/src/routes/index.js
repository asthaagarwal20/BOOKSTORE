import express from 'express';
const router = express.Router();
import bookRoute from './book.route';

import userRoute from './user.route';
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

  return router;
};

export default routes;
