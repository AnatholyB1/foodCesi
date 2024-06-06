import express from 'express';
import {getAllOrderItems, getOrderItem, getOrderItemsByOrder, removeOrderItem, removeOrderItemsByOrder, updateOrderItemById, updateOrderItemsByOrder} from '../controllers/order_items';


export default (router: express.Router): void => {
    router.get('/order_items', getAllOrderItems);
    router.get('/order_items/:id', getOrderItem);
    router.get('/order_items/order/:order_id', getOrderItemsByOrder);
    router.delete('/order_items/:id', removeOrderItem);
    router.delete('/order_items/order/:order_id', removeOrderItemsByOrder);
    router.put('/order_items/:id', updateOrderItemById);
    router.put('/order_items/order/:order_id', updateOrderItemsByOrder);
};