import * as dotenv from 'dotenv';

dotenv.config();

const {
    NODE_ENV,
    PORT,
    AUTH_USERNAME,
    AUTH_PASSWORD,
} = process.env;

const appConfig = {
    env: NODE_ENV,
    port: PORT || 3000,
    auth: {
        username: AUTH_USERNAME,
        password: AUTH_PASSWORD,
    },
}

export default appConfig;