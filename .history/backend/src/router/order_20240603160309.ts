import express from 'express';
import {getAllOrders,getAnOrderById,createAnOrder,updateAnOrder,getAllOrdersByUserId,getAllOrdersByDeliveryId,deleteAnOrder,deleteAllOrdersByUserId} from '../controllers/order'

export default (router: express.Router) => {
    router.get('/order', getAllOrders);
    router.get('/order/:id', getAnOrderById);
    router.post('/order', createAnOrder);
    router.put('/order/:id', updateAnOrder);
    router.delete('/order/:id', deleteAnOrder);
    router.delete('/order/user/:user_id', deleteAllOrdersByUserId);
    router.get('/order/user/:user_id', getAllOrdersByUserId);
    router.get('/order/delivery/:delivery_id', getAllOrdersByDeliveryId);
}