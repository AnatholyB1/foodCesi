import express from 'express'; //
import {get, merge} from 'lodash'

import { getUserBySessionToken } from '../db/users';


export const isAuthenticated = async (req : express.Request, res : express.Response) => {
    try{
        const sessionToken = await req.cookies['auth-session'];

        if(!sessionToken) return res.status(403)

        const existingUser = await getUserBySessionToken(sessionToken)
        
        if(!existingUser) return res.status(403)
            console.log('here')

        return res.status(200)
        //merge(req, {identity: existingUser})    
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