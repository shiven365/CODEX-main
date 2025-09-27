import express from 'express';
const router = express.Router();
import {protectedRoute} from '../middlewares/auth.middleware.js';

import { login, signup, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js';


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// router.put('/update-profile',protectedRoute, updateProfile);
router.get('/check-auth',protectedRoute, checkAuth);


export default router;