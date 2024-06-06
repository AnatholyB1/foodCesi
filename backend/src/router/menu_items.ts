import express from 'express';
import {getARestaurantByItemId, deleteItemsByRestaurantId, deleteItem, updateItem, createItem, getItemsByCategoryId, getItemsByRestaurantId, getItemById,getItems} from '../controllers/menu_items';

export default (router: express.Router) => {
   router.get('/menu_items', getItems);
    router.get('/menu_items/:id', getItemById);
    router.get('/menu_items/restaurant/:restaurant_id', getItemsByRestaurantId);
    router.get('/menu_items/category/:category_id', getItems
    );
    router.post('/menu_items', createItem);
    router.put('/menu_items/:id', updateItem);
    router.delete('/menu_items/:id', deleteItem);
    router.delete('/menu_items/restaurant/:restaurant_id', deleteItemsByRestaurantId);
    router.get('/menu_items/restaurant/:item_id', getARestaurantByItemId);

}

