import { env } from '@infra/config';
import { UnauthorizedException } from '@shared/exceptions';
import { IJwtPayload } from '@shared/interfaces';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function CheckAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const { accessSecret } = env.jwt;
    if (!token) throw new UnauthorizedException();
    const payload = jwt.verify(token, accessSecret) as IJwtPayload;
    req.user = payload;
    next();
}
