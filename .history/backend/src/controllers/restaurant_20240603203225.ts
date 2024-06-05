import express from 'express'
import { getRestaurants,getRestaurantById,getRestaurantsByUserId,deleteRestaurantByUserId,createRestaurant,updateRestaurant,deleteRestaurant } from '../db/restaurants'
import { createAddress } from '../db/addresses'


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
        const {
            user_id,
            name,
            street,
            city,
            state,
            zip_code,
            country,
            phone_number,
            categories,
        } = req.body

        if(!user_id || !name || !street || !city || !state || !zip_code || !country || !phone_number || !categories || categories.length === 0){
            return res.status(400).json({message: 'Missing information'})
        }

        const address = {
            user_id,
            street,
            city,
            state,
            zip_code,
            country
        }

        const new_address = await createAddress(address)

        if(!new_address){
            return res.status(400).json({message: 'Address not created'})
        }

        const restaurant = {
            user_id,
            address_id: new_address.id,
            name,
            phone_number,
            categories
        }

        const newRestaurant = await createRestaurant(restaurant)
        const return_address = {
            ...new_address,
            ...newRestaurant
        }


        return res.status(200).json(return_address)
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
        const restaurants = await deleteRestaurantByUserId(Number(user_id))
        return res.status(200).json(restaurants)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

