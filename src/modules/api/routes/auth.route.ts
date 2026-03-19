import { AuthController } from '@api/controllers/auth.controller';
import { Router } from 'express';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

export const authRoutes = router;
