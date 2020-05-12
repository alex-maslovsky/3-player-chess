import dotenv from 'dotenv';

dotenv.config();

export default {
    jwtSecret: process.env.JWT_SECRET,
    apiPort: parseInt(process.env.API_PORT) || 5000,
    schedulers: {
        inactiveUsersCron: '0 3 * * *',
    },
};
