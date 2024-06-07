import express from 'express';

import {getAllDeliveries,getADeliveryById,createADelivery,updateADelivery,deleteADelivery,getAllDeliveriesByUserId,getAllDeliveriesByCity,getADeliveryByUserIdAndCity} from '../controllers/delivery'


export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Deliveries
     *   description: Operations about deliveries
     */

    router.get('/delivery', getAllDeliveries);
/**
 * @swagger
 * /delivery:
 *   get:
 *     tags: [Deliveries]
 *     description: Récupère toutes les livraisons disponibles
 *     responses:
 *       200:
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de la livraison
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur associé à la livraison
 *               city:
 *                 type: string
 *                 description: La ville de la livraison
 *               available:
 *                 type: boolean
 *                 description: Indique si la livraison est disponible ou non
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Aucune livraison trouvée
 */
    router.get('/delivery/:id', getADeliveryById);
    router.post('/delivery', createADelivery);
    router.put('/delivery/:id', updateADelivery);
    router.delete('/delivery/:id', deleteADelivery);
    router.get('/delivery/user/:user_id', getAllDeliveriesByUserId);
    router.get('/delivery/city/:city', getAllDeliveriesByCity);
    router.get('/delivery/user/:user_id/city/:city', getADeliveryByUserIdAndCity);
}
