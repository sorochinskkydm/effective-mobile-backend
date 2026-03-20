import { LoginDto } from '@api/auth/dtos';
import { CreateUserDto } from '@api/users/dtos';
import { env } from '@infra/config';
import { UserRepository } from '@infra/postgres/repositories/user.repository';
import {
    AlreadyExistsException,
    EntityNotFoundException,
    ForbiddenException,
    UnauthorizedException,
} from '@shared/exceptions';
import { IAccessTokens, IJwtPayload } from '@shared/interfaces';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthService {
    private readonly userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    public async register(dto: CreateUserDto) {
        const { email, password, ...createDto } = dto;
        const user = await this.userRepository.getOne({ where: { email } });
        if (user) throw new AlreadyExistsException('email', email);

        const hash = await this.hashPassword(password);
        const { id, role } = await this.userRepository.create({
            ...createDto,
            password: hash,
            email,
        });
        return this.generateAccessToken({ id, role });
    }

    public async login(dto: LoginDto): Promise<IAccessTokens> {
        const { email, password } = dto;
        const user = await this.userRepository.getOne({
            where: { email },
            select: ['id', 'password', 'role', 'isActive'],
        });
        if (!user) throw new EntityNotFoundException('User', 'email', email);
        if (!user.isActive) throw new ForbiddenException();

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new UnauthorizedException();

        return this.generateAccessToken({ id: user.id, role: user.role });
    }

    private generateAccessToken(payload: IJwtPayload): IAccessTokens {
        const { accessSecret, refreshSecret } = env.jwt;
        const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '168h' });
        const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    public async refreshToken(refreshToken: string): Promise<IAccessTokens> {
        const { refreshSecret } = env.jwt;
        const { id } = jwt.verify(refreshToken, refreshSecret) as IJwtPayload;
        const user = await this.userRepository.getOne({ where: { id }, select: ['id', 'role'] });
        if (!user) throw new UnauthorizedException();
        return this.generateAccessToken({ id: user.id, role: user.role });
    }
}
