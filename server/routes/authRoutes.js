import express from 'express';
import {
  authAdmin,
  logoutAdmin,
  getAdminProfile,
  registerAdmin,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.post('/register', registerAdmin);
router.post('/logout', logoutAdmin);
router.get('/profile', protect, getAdminProfile);

export default router;
