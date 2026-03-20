import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export function ValidateBody(validator: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        const dto = plainToInstance(validator, req.body);
        validate(dto).then((errors) => {
            if (errors.length > 0) {
                const validation = errors.map((error) => error.constraints);
                return res.status(400).json({ validation });
            }
            req.body = dto;
            next();
        });
    };
}
