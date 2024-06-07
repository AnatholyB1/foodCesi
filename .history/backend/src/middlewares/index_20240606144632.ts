import express from 'express'; //
import {get, merge} from 'lodash'

import { getUserByRefreshToken, getUserById } from '../db/users';
import { createLog } from '../db/log';
import jwt from 'jsonwebtoken'


export const isAuthenticated = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    try{
        const sessionToken = await req.cookies['auth-session'];

        if(!sessionToken) return res.status(400)
            
        jwt.verify(sessionToken, process.env.ACCESS_JWT_KEY || "secret", async (err : any, decoded : any) => {
            if(err) return res.status(403)
            
            const user = await getUserById(decoded.username)
            
            if(user == null) return res.status(400)
            
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