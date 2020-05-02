import jwt from 'jsonwebtoken';
import config from '../config';

export function verify<TData extends Object>(token: string): TData | null {
    try {
        const tokenData = token && jwt.verify(token, config.jwtSecret);

        return (tokenData || null) as TData | null;
    } catch(error) {
        console.error(error);
        return null;
    }
}

export const generate = (data: Object): string => {
    return jwt.sign(data, config.jwtSecret);
}
