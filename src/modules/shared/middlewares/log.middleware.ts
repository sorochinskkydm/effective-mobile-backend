import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    const date = new Date().toLocaleString('ru-RU');
    console.log(`${date} [${req.method}] - ${req.url} - ${res.statusCode}`);
    next();
}
