import express from 'express'; //
import {get, merge} from 'lodash'

import { getUserBySessionToken } from '@/db/users';


export const isAuthenticated = async (req : express.Request, res : express.Response) => {
    try{

        const sessionToken = await req.cookies['auth-session'];

        if(!sessionToken) return res.status(403)

        const existingUser = await getUserBySessionToken(sessionToken)
        
        if(!existingUser) return res.status(403)

        merge(req, {identity: existingUser})    
    }catch(error){
        console.log(error)
        return res.status(500)
    }
}

export const isOwner = async (req : express.Request, res : express.Response) => {
    try {
        
        const {id} = req.params;

        const identityId = get(req, 'identity._id');

        if (!identityId) {
            return res.status(400)
        }

        const currentUserId = identityId as string;

    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}