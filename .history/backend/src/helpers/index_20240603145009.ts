import crypto from 'crypto';
import { createLog } from '../db/log';

const SECRET = 'food-cesi-auth'


export const random = () => crypto.randomBytes(64).toString('base64')
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}

export const createAndConsoleLogs = (message : string, level : string = 'info') => {
    console.log(level + ': ' +message)
    createLog({message: message, level: level})
}

export const withLogging = (fn: Function) => {
    return async (...args: any[]) => {
        createAndConsoleLogs(`Start ${fn.name}`);
        try {
            const result = await fn(...args);
            createAndConsoleLogs(`Success ${fn.name}`);
            return result;
        } catch (error) {
            createAndConsoleLogs(`Error ${fn.name}: ${error}`, 'error');
            throw error;
        }
    }
}