import express from 'express'
import { getUsers } from '@/db/users'

export const getAllUsers = async ( req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users)
    }catch (error){
        console.log(error)
        return res.status(400)
    }
}


export const deleteUser = async(req: express.Request, res: express.Response) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}