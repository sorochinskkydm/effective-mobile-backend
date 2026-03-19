import { env } from '@infra/config';
import { AppDataSource } from '@infra/postgres/typeorm.config';
import * as express from 'express';
import helmet from 'helmet';
const app = express();
app.use(express.json());
app.use(helmet());

const start = async () => {
    try {
        await AppDataSource.initialize();
        app.listen(env.port, () => {
            console.log(`Server started on port ${env.port}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error}`);
    }
};

start();
