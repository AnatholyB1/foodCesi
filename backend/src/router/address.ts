import express from 'express'
import {getUserByStreetInfo,getUserByZipCodeInfo,getUserByCountryInfo,getUserByStateInfo,getUserByCityInfo,deleteAddressesByUser, deleteAddressInfo,updateAddressInfo,createNewAddress,getAddressesByUser, getAddress, getAllAddresses} from '../controllers/address'

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   name: Addresses
     *   description: Operations about addresses
     */
    router.get('/addresses', getAllAddresses);
    /**
 * @swagger
 * /addresses:
 *   get:
 *     tags: [Addresses]
 *     description: Récupère toutes les adresses
 *     responses:
 *       200:
 *         description: Liste de toutes les adresses
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Address'
 *       404:
 *         description: Aucune adresse trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/addresses/:id', getAddress);
    /**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     tags: [Addresses]
 *     description: Récupère une adresse par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'adresse
 *     responses:
 *       200:
 *         description: Détails de l'adresse
 *         schema:
 *           $ref: '#/definitions/Address'
 *       404:
 *         description: Adresse non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/addresses/user/:user_id', getAddressesByUser);
    /**
 * @swagger
 * /addresses/user/{user_id}:
 *   get:
 *     tags: [Addresses]
 *     description: Récupère les adresses par identifiant d'utilisateur
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des adresses de l'utilisateur
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Address'
 *       404:
 *         description: Aucune adresse trouvée pour cet utilisateur
 *       500:
 *         description: Erreur interne du serveur
 */
    router.post('/addresses', createNewAddress);
    /**
 * @swagger
 * /addresses:
 *   post:
 *     tags: [Addresses]
 *     description: Crée une nouvelle adresse
 *     parameters:
 *       - in: body
 *         name: Address
 *         required: true
 *         description: Les détails de la nouvelle adresse
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             street:
 *               type: string
 *               description: La rue de l'adresse
 *             city:
 *               type: string
 *               description: La ville de l'adresse
 *             state:
 *               type: string
 *               description: L'état de l'adresse
 *             zip_code:
 *               type: string
 *               description: Le code postal de l'adresse
 *             country:
 *               type: string
 *               description: Le pays de l'adresse
 *     responses:
 *       201:
 *         description: Adresse créée avec succès
 *         schema:
 *           $ref: '#/definitions/Address'
 *       400:
 *         description: Requête invalide, informations manquantes
 *       500:
 *         description: Erreur interne du serveur
 */
    router.put('/addresses/:id', updateAddressInfo);
    /**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     tags: [Addresses]
 *     description: Met à jour une adresse par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'adresse
 *       - in: body
 *         name: Address
 *         required: true
 *         description: Les nouvelles informations de l'adresse
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *               description: L'identifiant de l'utilisateur
 *             street:
 *               type: string
 *               description: La rue de l'adresse
 *             city:
 *               type: string
 *               description: La ville de l'adresse
 *             state:
 *               type: string
 *               description: L'état de l'adresse
 *             zip_code:
 *               type: string
 *               description: Le code postal de l'adresse
 *             country:
 *               type: string
 *               description: Le pays de l'adresse
 *     responses:
 *       200:
 *         description: Adresse mise à jour avec succès
 *         schema:
 *           $ref: '#/definitions/Address'
 *       400:
 *         description: Requête invalide, informations manquantes
 *       404:
 *         description: Adresse non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/addresses/:id', deleteAddressInfo);
    /**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     tags: [Addresses]
 *     description: Supprime une adresse par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'adresse
 *     responses:
 *       204:
 *         description: Adresse supprimée avec succès
 *       404:
 *         description: Adresse non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
    router.delete('/addresses/user/:user_id', deleteAddressesByUser);
    /**
 * @swagger
 * /addresses/user/{user_id}:
 *   delete:
 *     tags: [Addresses]
 *     description: Supprime toutes les adresses d'un utilisateur par l'identifiant de l'utilisateur
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
 *     responses:
 *       204:
 *         description: Adresses supprimées avec succès
 *       404:
 *         description: Aucune adresse trouvée pour cet utilisateur
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/addresses/city/:city', getUserByCityInfo);
    /**
 * @swagger
 * /addresses/city/{city}:
 *   get:
 *     tags: [Addresses]
 *     description: Récupère les utilisateurs par ville
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom de la ville
 *     responses:
 *       200:
 *         description: Liste des utilisateurs de la ville
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       404:
 *         description: Aucun utilisateur trouvé pour cette ville
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/addresses/state/:state', getUserByStateInfo);
  /**
 * @swagger
 * /addresses/state/{state}:
 *   get:
 *     tags: [Addresses]
 *     description: Récupère les utilisateurs par état
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: Le nom de l'état
 *     responses:
 *       200:
 *         description: Liste des utilisateurs de l'état
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       404:
 *         description: Aucun utilisateur trouvé pour cet état
 *       500:
 *         description: Erreur interne du serveur
 */  
    router.get('/addresses/country/:country', getUserByCountryInfo);
    /**
 * @swagger
 * /addresses/country/{country}:
 *   get:
 *     tags: [Addresses]
 *     description: Récupère les utilisateurs par pays
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: Le pays de l'adresse
 *     responses:
 *       200:
 *         description: Utilisateurs récupérés avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               street:
 *                 type: string
 *                 description: La rue de l'adresse
 *               city:
 *                 type: string
 *                 description: La ville de l'adresse
 *               state:
 *                 type: string
 *                 description: L'état de l'adresse
 *               zip_code:
 *                 type: string
 *                 description: Le code postal de l'adresse
 *               country:
 *                 type: string
 *                 description: Le pays de l'adresse
 *       404:
 *         description: Aucun utilisateur trouvé pour ce pays
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/addresses/zip_code/:zip_code', getUserByZipCodeInfo);
    /**
 * @swagger
 * /addresses/zip_code/{zip_code}:
 *   get:
 *     tags: [Addresses]
 *     description: Récupère les utilisateurs par code postal
 *     parameters:
 *       - in: path
 *         name: zip_code
 *         required: true
 *         schema:
 *           type: string
 *         description: Le code postal de l'adresse
 *     responses:
 *       200:
 *         description: Utilisateurs récupérés avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               street:
 *                 type: string
 *                 description: La rue de l'adresse
 *               city:
 *                 type: string
 *                 description: La ville de l'adresse
 *               state:
 *                 type: string
 *                 description: L'état de l'adresse
 *               zip_code:
 *                 type: string
 *                 description: Le code postal de l'adresse
 *               country:
 *                 type: string
 *                 description: Le pays de l'adresse
 *       404:
 *         description: Aucun utilisateur trouvé pour ce code postal
 *       500:
 *         description: Erreur interne du serveur
 */
    router.get('/addresses/street/:street', getUserByStreetInfo);
    /**
 * @swagger
 * /addresses/street/{street}:
 *   get:
 *     tags: [Addresses]
 *     description: Récupère les utilisateurs par rue
 *     parameters:
 *       - in: path
 *         name: street
 *         required: true
 *         schema:
 *           type: string
 *         description: La rue de l'adresse
 *     responses:
 *       200:
 *         description: Utilisateurs récupérés avec succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               user_id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur
 *               street:
 *                 type: string
 *                 description: La rue de l'adresse
 *               city:
 *                 type: string
 *                 description: La ville de l'adresse
 *               state:
 *                 type: string
 *                 description: L'état de l'adresse
 *               zip_code:
 *                 type: string
 *                 description: Le code postal de l'adresse
 *               country:
 *                 type: string
 *                 description: Le pays de l'adresse
 *       404:
 *         description: Aucun utilisateur trouvé pour cette rue
 *       500:
 *         description: Erreur interne du serveur
 */
}