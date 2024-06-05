import express from 'express'
import {getAllRestaurants,getARestaurantById,getRestaurantsByUser,createARestaurant ,updateARestaurant,deleteARestaurant,deleteAllRestaurantsByUserId } from '../controllers/restaurant'

export default (router: express.Router) => {
    router.get('/restaurants', getAllRestaurants);
    router.get('/restaurants/:id', getARestaurantById);
    router.get('/restaurants/user/:user_id', getRestaurantsByUser);
    router.post('/restaurants', createARestaurant);
    router.put('/restaurants/:id', updateARestaurant);
    router.delete('/restaurants/:id', deleteARestaurant);
    router.delete('/restaurants/user/:user_id', deleteAllRestaurantsByUserId);
    
}