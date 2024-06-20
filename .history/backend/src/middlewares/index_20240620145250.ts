import express from 'express'; //
import {get, merge} from 'lodash'

import { getUserById } from '../db/users';
import { createLog } from '../db/log';
import jwt from 'jsonwebtoken'
import { getDevByApiKey } from '../db/dev';


export const isAuthenticated = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    try{
        const apiKey = req.headers['x-api-key'] as string;

        if(apiKey){
           
            const dev = await getDevByApiKey(apiKey);
            if (!dev) {
              return res.status(401).json({ message: 'Invalid API key' }).end();
            }
          
            next();
        }

        const sessionToken = await req.cookies['auth-session'];

        if(!sessionToken) return res.status(301).json({ message: 'not connected'}).end()
            
        jwt.verify(sessionToken, process.env.ACCESS_JWT_KEY || "secret", async (err : any, decoded : any) => {
            if(err) return res.status(403).end()
            
            const user = await getUserById(decoded.id)
            
            if(user == null) return res.status(301).json({message : "invalid token"}).end()
            
            merge(req, {identity: user})
            next()
        })

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

