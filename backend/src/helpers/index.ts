import crypto from 'crypto';
import { createLog } from '../db/log';

const SECRET = 'food-cesi-auth'


export const random = () => crypto.randomBytes(64).toString('base64')
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}

export const createAndConsoleLogs = async (message : string, level : string = 'info') => {
    console.log(level + ': ' +message)
    await createLog({message: message, level: level})
}

export const withLogging = (name : string,fn: Function) => {
    return async (...args: any[]) => {
        createAndConsoleLogs(`Start ${name}`);
            const result = await fn(...args);
            await createAndConsoleLogs(`result ${name}: ${result?.statusCode + ' ' + result?.statusMessage}`);
            return result;
    }
}