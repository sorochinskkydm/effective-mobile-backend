import { LoginDto } from '@api/auth/dtos';
import { AuthService } from '@api/auth/auth.service';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@api/users/dtos';

export class AuthController {
    private readonly authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    public login = async (req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) => {
        try {
            const data = await this.authService.login(req.body);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

    public register = async (
        req: Request<{}, {}, CreateUserDto>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const data = await this.authService.register(req.body);
            res.status(201).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

    public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.authService.refreshToken(req.body.refreshToken);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };
}
