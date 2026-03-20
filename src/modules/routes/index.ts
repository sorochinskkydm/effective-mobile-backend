import { Router } from 'express';
import { authRoutes } from './auth.route';
import { userRoutes } from './user.route';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
export const apiRoutes = router;
