import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';
import {withLogging} from '../helpers'

export const login = withLogging('login',async (req: express.Request, res: express.Response) => {
    try{

        const {email, password} = req.body

        if(!email || !password) return res.status(400)

        const user = await getUserByEmail(email)

        if(!user) return res.status(400)
        
        const expectedHash = authentication(user.salt, password)

        if(user.password !== expectedHash)return res.status(403)

        const salt = random()
        const sessionToken = authentication(salt, user.email);
        user.sessionToken = sessionToken
        await user.save()
        res.cookie('auth-session', sessionToken, {
             domain: process.env.SERVER_NAME, 
             httpOnly: true, // The cookie is only accessible by the web server
             expires: new Date(Date.now() + 24 * 3600000), // The cookie expires in 24 hours
             path: '/'})

        return res.status(200).json(user).end()

    }catch (error){
        console.log(error);
        return res.status(500)
    }
})


export const register = withLogging('register',async (req: express.Request, res : express.Response) => {
    try{
        const {email, password, username} = req.body

        if(!email || !password || !username) return res.sendStatus(400)

        const existingUser = await getUserByEmail(email) 
        
        if(existingUser) return res.sendStatus(400)

        const salt = random()
        const saltedPassword = authentication(salt, password)
        const sessionToken = authentication(salt, email);
        const user = await createUser({
            email,
            username,
            salt,
            password: saltedPassword ,
            sessionToken
        })  

        res.cookie('auth-session', user.sessionToken, {
            domain: process.env.SERVER_NAME, 
            httpOnly: true, // The cookie is only accessible by the web server
            expires: new Date(Date.now() + 24 * 3600000), // The cookie expires in 24 hours
            path: '/'})

        return res.status(200).json(user).end()


    }catch(error){
        console.log(error);
        return res.sendStatus(500)
    }
})