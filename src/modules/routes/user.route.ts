import { AuthController } from '@api/auth/auth.controller';
import { LoginDto, RefreshDto } from '@api/auth/dtos';
import { CreateUserDto } from '@api/users/dtos';
import { UserController } from '@api/users/user.controller';
import { CheckAuth, ValidateBody } from '@shared/middlewares';
import { AdminRoute } from '@shared/middlewares/admin-route.middleware';
import { Router } from 'express';

const router = Router().use(CheckAuth);
const userController = new UserController();

router.get('/', AdminRoute, userController.getList);
router.get('/:id', userController.getOne);
router.post('/block/:id', userController.toggleBlock);
export const userRoutes = router;
