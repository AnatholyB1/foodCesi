import crypto from 'crypto';
import { createLog } from '../db/log';

const SECRET = 'food-cesi-auth'


export const random = () => crypto.randomBytes(64).toString('base64')
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}

export const withLogging = (fn: Function) => {
    return async (...args: any[]) => {
        console.log(`Start ${fn.name}`);
        try {
            const result = await fn(...args);
            console.log(`Success ${fn.name}`);
            return result;
        } catch (error) {
            console.log(`Error ${fn.name}: ${error}`);
            throw error;
        }
    }
}