import express from 'express';
import * as userinfoController from '../controllers/userinfo.controller';
import { userAuth,resetuserAuth } from '../middlewares/auth.middleware';

const router = express.Router();
router.put('/edit_user', userAuth, userinfoController.customerDetails);

export default router;