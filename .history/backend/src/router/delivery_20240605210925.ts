import express from 'express';

import {getAllDeliveries,getADeliveryById,createADelivery,updateADelivery,deleteADelivery,getAllDeliveriesByUserId,getAllDeliveriesByCity,getADeliveryByUserIdAndCity} from '../controllers/delivery'


export default (router: express.Router) => {

    router.get('/delivery', getAllDeliveries);
    router.get('/delivery/:id', getADeliveryById);
    router.post('/delivery', createADelivery);
    router.put('/delivery/:id', updateADelivery);
    router.delete('/delivery/:id', deleteADelivery);
    router.get('/delivery/user/:user_id', getAllDeliveriesByUserId);
    router.get('/delivery/city/:city', getAllDeliveriesByCity);
    router.get('/delivery/user/:user_id/city/:city', getADeliveryByUserIdAndCity);
}
