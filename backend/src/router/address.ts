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
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de l'adresse
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
 *         description: Succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de l'adresse
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
 *     description: Récupère les adresses par l'ID de l'utilisateur
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de l'utilisateur
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
 *                 description: L'identifiant de l'adresse
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
 *         description: Adresses non trouvées
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
 *         name: address
 *         description: Les informations de l'adresse à créer
 *         schema:
 *           type: object
 *           required:
 *             - user_id
 *             - street
 *             - city
 *             - state
 *             - zip_code
 *             - country
 *           properties:
 *             user_id:
 *               type: integer
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zip_code:
 *               type: string
 *             country:
 *               type: string
 *     responses:
 *       201:
 *         description: Adresse créée avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de l'adresse
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
 *       400:
 *         description: Informations manquantes ou incorrectes
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
 *         name: address
 *         description: Les informations mises à jour de l'adresse
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zip_code:
 *               type: string
 *             country:
 *               type: string
 *     responses:
 *       200:
 *         description: Adresse mise à jour avec succès
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: L'identifiant de l'adresse
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
 *       400:
 *         description: Informations manquantes ou incorrectes
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
 *     description: Supprime toutes les adresses d'un utilisateur par l'ID de l'utilisateur
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
 *         description: Utilisateur non trouvé
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
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               country:
 *                 type: string
 *       404:
 *         description: Utilisateurs non trouvés
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
 *         description: Succès
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               country:
 *                 type: string
 *       404:
 *         description: Utilisateurs non trouvés
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
 *         description: Le nom du pays
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
 *               user_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               country:
 *                 type: string
 *       404:
 *         description: Utilisateurs non trouvés
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
 *         description: Le code postal
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
 *               user_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               country:
 *                 type: string
 *       404:
 *         description: Utilisateurs non trouvés
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
 *         description: Le nom de la rue
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
 *               user_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip_code:
 *                 type: string
 *               country:
 *                 type: string
 *       404:
 *         description: Utilisateurs non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
}