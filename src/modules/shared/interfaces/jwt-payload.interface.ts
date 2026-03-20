import { RoleEnum } from '@shared/enums';

declare global {
    namespace Express {
        interface Request {
            user: IJwtPayload;
        }
    }
}

export interface IJwtPayload {
    id: string;
    role: RoleEnum;
}
export interface IAccessTokens {
    accessToken: string;
    refreshToken: string;
}
