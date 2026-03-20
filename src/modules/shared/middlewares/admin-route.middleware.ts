import { RoleEnum } from '@shared/enums';
import { ForbiddenException } from '@shared/exceptions';
import { NextFunction, Request, Response } from 'express';

export function AdminRoute(req: Request, res: Response, next: NextFunction) {
    if (req.user.role !== RoleEnum.ADMIN) throw new ForbiddenException();
    next();
}
