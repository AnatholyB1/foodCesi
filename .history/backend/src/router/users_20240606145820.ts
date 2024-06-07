import express from 'express'
import { deleteUser, getAllUsers, updateUser,deleteAllTheUsers } from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router) => {
    router.delete('/users', deleteAllTheUsers)
    router.get('/users', getAllUsers)
    router.delete('/users/:id',isAuthenticated, isOwner, deleteUser)
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
}   