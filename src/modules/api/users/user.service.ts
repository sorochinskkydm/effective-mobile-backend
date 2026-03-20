import { UserRepository } from '@infra/postgres/repositories/user.repository';
import { BlockUserDto } from './dtos';
import { PaginationDto } from '@shared/dtos';
import { UserEntity } from '@infra/postgres/entities';
import { Request } from 'express';
import { RoleEnum } from '@shared/enums';
import { EntityNotFoundException } from '@shared/exceptions';

export class UserService {
    private readonly userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    public async findById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.getOne({ where: { id } });
        if (!user) throw new EntityNotFoundException('User', 'id', id);
        return user;
    }

    public async toggleBlock(id: string): Promise<{ isActive: boolean }> {
        return this.userRepository.toggleBlock(id);
    }

    public async getList(dto: PaginationDto): Promise<UserEntity[]> {
        return this.userRepository.getList(dto);
    }
}
