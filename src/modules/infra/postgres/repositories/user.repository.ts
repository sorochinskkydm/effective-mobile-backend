import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities';
import { AppDataSource } from '../typeorm.config';
import { CreateUserDto } from '@api/dtos';

export class UserRepository {
    private readonly userRepo = AppDataSource.getRepository(UserEntity);

    public async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity | null> {
        return this.userRepo.findOne(options);
    }

    public async create(dto: CreateUserDto): Promise<UserEntity> {
        const { email } = dto;
        const exists = await this.userRepo.findOne({ where: { email } });
        if (exists) throw new Error('User already exists');
        const user = this.userRepo.create(dto);
        return this.userRepo.save(user);
    }
}
