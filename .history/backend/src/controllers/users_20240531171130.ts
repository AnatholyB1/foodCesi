import express from 'express'
import { deleteUserById, getUsers, getUserById } from 'db/users'

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
        const {id} = req.params

        const deleteUser = await deleteUserById(id)

        return res.status(200).json(deleteUser)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}


export const updateUser = async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const {username} = req.body

        if(!username) return res.status(400)

        const user = await getUserById(id)   

        if(!user) return res.status(400)
        
        user.username = username
        await user.save()

        return res.status(200).json(user).end()

    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}