import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// User sign-up route
router.post('/signup', authController.signUp);

// User login route
router.post('/login', authController.login);

// Password reset route
router.post('/reset-password', authController.resetPassword);

export default router;