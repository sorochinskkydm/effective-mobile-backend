import { RoleEnum } from '@shared/enums';

export interface IJwtPayload {
    id: string;
    role: RoleEnum;
}
export interface IAccessTokens {
    accessToken: string;
    refreshToken: string;
}
