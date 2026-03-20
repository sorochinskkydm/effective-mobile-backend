import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { PaginationDto } from '@shared/dtos';
import { ForbiddenException } from '@shared/exceptions';
import { RoleEnum } from '@shared/enums';

export class UserController {
    private readonly userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    public getList = async (
        req: Request<{}, {}, PaginationDto>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const data = await this.userService.getList(req.body);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };

    public getOne = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const requestedId = req.params.id;
            const currentUser = req.user;
            if (currentUser?.role !== RoleEnum.ADMIN && requestedId !== currentUser?.id) {
                throw new ForbiddenException();
            }

            const user = await this.userService.findById(requestedId);
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            next(error);
        }
    };

    public toggleBlock = async (
        req: Request<{ id: string }, {}, {}>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id, role } = req.user;
            const requestedId = req.params.id;
            if (role !== RoleEnum.ADMIN && requestedId !== id) {
                throw new ForbiddenException();
            }
            const data = await this.userService.toggleBlock(
                role === RoleEnum.ADMIN ? req.params.id : id,
            );
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            next(error);
        }
    };
}
