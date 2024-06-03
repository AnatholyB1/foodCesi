import express from 'express'; //
import {get, merge} from 'lodash'

import { getUserBySessionToken } from '../db/users';
import { createLog } from '../db/log';


export const isAuthenticated = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    try{
        const sessionToken = await req.cookies['auth-session'];

        if(!sessionToken) return res.status(400)
            
        const existingUser = await getUserBySessionToken(sessionToken)

        if(existingUser == null) 
        {
            return res.status(400)
        }
            
        merge(req, {identity: existingUser})    
        next()
    }catch(error){
        console.log(error)
        return res.status(500)
    }
}

export const isOwner = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    try {
        
        const {id} = req.params;

        const identityId = get(req, 'identity._id');

        if (!identityId) {
            return res.status(400)
        }

        const currentUserId = identityId as string;

        if(currentUserId !== id) return res.status(403)
        
        next()       

    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}



export const logRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    createLog({message :`[${new Date().toISOString()}] ${req.method} to ${req.url}`});
    next();
}