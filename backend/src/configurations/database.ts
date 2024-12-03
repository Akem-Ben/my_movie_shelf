import {Sequelize} from 'sequelize';
import { DB_NAME } from './envKeys'
import { DB_USERNAME } from './envKeys'
import { DB_PASSWORD } from './envKeys'
import { DB_HOST } from './envKeys'
import { DB_PORT } from './envKeys'

export const database = new Sequelize(
    DB_NAME!,
    DB_USERNAME!,
    DB_PASSWORD as string,
{
    host: DB_HOST,
    port: DB_PORT as unknown as number,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        encrypt: true
    },
}

)