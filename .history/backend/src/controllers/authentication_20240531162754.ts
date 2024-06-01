import express from 'express';
import { getUserByEmail, createUser } from '@/db/users';
import { authentication, random } from '@/helpers';
import jwt from 'jsonwebtoken';



const login = async (req: express.Request, res: express.Response) => {
    try{

        const {email, password} = req.body

        if(!email || !password) return res.status(400)

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        if(!user) return res.status(400)
        
        const expectedHash = authentication(user.authentication.salt, password)

        if(user.authentication.password !== expectedHash)return res.status(403)

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        
        res.cookie('auth-session', user.authentication.sessionToken, { domain: 'localhost', path: '/'})

        return res.status(200).json(user).end()

    }catch (error){
        console.log(error);
        return res.status(500)
    }
}


export const register = async (req: express.Request, res : express.Response) => {
    try{
        const {email, password, username} = req.body

        if(!email || !password || !username) return res.sendStatus(400)

        const existingUser = await getUserByEmail(email) 
        
        if(existingUser) return res.sendStatus(400)

        const salt = random()
        const saltedPassword = authentication(salt, password)
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: saltedPassword ,
            },
        })  

        jwt.sign(user,saltedPassword )

        return res.status(200).json(user).end()


    }catch(error){
        console.log(error);
        return res.sendStatus(500)
    }
}