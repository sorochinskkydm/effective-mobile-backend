import { DataSource } from 'typeorm';
import { env } from '../config';
import { UserEntity } from './entities';
import * as path from 'path';

const { host, password, port, username, database } = env.db;
export const AppDataSource = new DataSource({
    host,
    port,
    username,
    password,
    database,
    entities: [path.join(__dirname, './entities/*.{ts,.js}')],
    type: 'postgres',
    synchronize: false,
    migrationsTableName: 'typeorm_migrations',
    migrations: [path.join(__dirname, './migrations/*.{ts,.js}')],
    logging: process.env.NODE_ENV === 'development',
});
