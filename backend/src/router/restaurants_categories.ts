import express from 'express'
import {getAllRestaurantCategories, getRestaurantCategory,createRestaurantCategoryInfo ,updateRestaurantCategoryInfo, deleteRestaurantCategoryInfo} from '../controllers/restaurant_categories'

export default (router: express.Router) => {
    router.get('/restaurant_categories', getAllRestaurantCategories);
    router.get('/restaurant_categories/:id', getRestaurantCategory);
    router.post('/restaurant_categories', createRestaurantCategoryInfo);
    router.put('/restaurant_categories/:id', updateRestaurantCategoryInfo);
    router.delete('/restaurant_categories/:id', deleteRestaurantCategoryInfo);
    
}