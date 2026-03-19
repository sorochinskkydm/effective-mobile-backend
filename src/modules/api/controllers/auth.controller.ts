import { CreateUserDto, LoginDto } from '@api/dtos';
import { AuthService } from '@api/services/auth.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
    private readonly authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    public async register(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
        try {
            const data = await this.authService.register(req.body);
            res.status(201).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    public async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.authService.refreshToken(req.body.refreshToken);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) {
        try {
            const data = await this.authService.login(req.body);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}
