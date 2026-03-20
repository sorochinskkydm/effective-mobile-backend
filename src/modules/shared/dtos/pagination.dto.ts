import { OrderEnum } from '@shared/enums';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @Min(1)
    @Max(500)
    @IsInt()
    @Type(() => Number)
    take: number = 15;

    @IsOptional()
    orderBy: string = 'createdAt';

    @IsOptional()
    @IsEnum(OrderEnum)
    order: OrderEnum = OrderEnum.DESC;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
