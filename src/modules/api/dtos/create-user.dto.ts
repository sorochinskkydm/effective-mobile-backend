import { RoleEnum } from '@shared/enums';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    patronymic: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(RoleEnum)
    role: RoleEnum;
}
