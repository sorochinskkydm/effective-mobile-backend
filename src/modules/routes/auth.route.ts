import { AuthController } from '@api/auth/auth.controller';
import { LoginDto, RefreshDto } from '@api/auth/dtos';
import { CreateUserDto } from '@api/users/dtos';
import { CheckAuth, ValidateBody } from '@shared/middlewares';
import { Router } from 'express';

const router = Router();
const authController = new AuthController();

router.post('/register', ValidateBody(CreateUserDto), authController.register);
router.post('/login', ValidateBody(LoginDto), authController.login);
router.post('/refresh', ValidateBody(RefreshDto), authController.refreshToken);

export const authRoutes = router;
