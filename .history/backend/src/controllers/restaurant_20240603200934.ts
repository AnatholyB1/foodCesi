import express from 'express'
import { getRestaurants,getRestaurantById,getRestaurantsByUserId,deleteRestaurantByUserId,createRestaurant,updateRestaurant,deleteRestaurant } from '../db/restaurants'


export const getAllRestaurants = async(req: express.Request, res: express.Response) => {
    try {
        const restaurants = await getRestaurants()
        return res.status(200).json(restaurants)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

export const getARestaurantById = async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const restaurant = await getRestaurantById(Number(id))
        return res.status(200).json(restaurant)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

export const getRestaurantsByUser = async(req: express.Request, res: express.Response) => {
    try {
        const {user_id} = req.params
        const restaurants = await getRestaurantsByUserId(Number(user_id))
        return res.status(200).json(restaurants)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

export const createARestaurant = async(req: express.Request, res: express.Response) => {
    try {
        const restaurant = req.body
        const newRestaurant = await createRestaurant(restaurant)
        return res.status(200).json(newRestaurant)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}


export const updateARestaurant = async(req: express.Request, res: express.Response) => {
    try {
        const id = Number(req.params.id);
        const restaurant = req.body
        const updatedRestaurant = await updateRestaurant(id,restaurant)
        return res.status(200).json(updatedRestaurant)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}


export const deleteARestaurant = async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const restaurant = await deleteRestaurant(Number(id))
        return res.status(200).json(restaurant)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

export const deleteAllRestaurantsByUserId = async(req: express.Request, res: express.Response) => {
    try {
        const {user_id} = req.params
        const restaurants = await deleteRestaurantsByUserId(Number(user_id))
        return res.status(200).json(restaurants)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

