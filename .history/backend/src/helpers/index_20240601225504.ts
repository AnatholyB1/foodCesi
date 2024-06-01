import crypto from 'crypto';

const SECRET = 'food-cesi-auth'


export const random = () => crypto.randomBytes(64).toString('base64')
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}