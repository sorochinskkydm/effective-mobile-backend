import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class BlockUserDto {
    @IsUUID()
    @IsOptional()
    id: string;
}
