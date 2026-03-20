import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities';
import { AppDataSource } from '../typeorm.config';
import { PaginationDto } from '@shared/dtos';
import { BlockUserDto, CreateUserDto } from '@api/users/dtos';
import { EntityNotFoundException } from '@shared/exceptions';

export class UserRepository {
    private readonly userRepo = AppDataSource.getRepository(UserEntity);

    public async getOne(options: FindOneOptions<UserEntity>): Promise<UserEntity | null> {
        return this.userRepo.findOne(options);
    }

    public async getList({ take, skip }: PaginationDto): Promise<UserEntity[]> {
        return this.userRepo.find({ skip, take });
    }

    public async toggleBlock(id: string): Promise<{ isActive: boolean }> {
        const user = await this.userRepo.findOne({ where: { id }, select: ['id', 'isActive'] });
        if (!user) throw new EntityNotFoundException('User', 'id', id);
        await this.userRepo.update({ id }, { isActive: !user.isActive });
        return { isActive: !user.isActive };
    }

    public async create(dto: CreateUserDto): Promise<UserEntity> {
        const { email } = dto;
        const exists = await this.userRepo.findOne({ where: { email } });
        if (exists) throw new Error('User already exists');
        const user = this.userRepo.create(dto);
        return this.userRepo.save(user);
    }
}
