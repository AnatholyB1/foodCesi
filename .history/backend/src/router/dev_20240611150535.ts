import express from "express";
import {
  getDevs,
  getDevById,
  createDev,
  updateDev,
  deleteDev,
  getDevsByUserId,
  getDevByApiKey,
} from "../controllers/dev";

export default (router: express.Router) => {
  /**
   * @swagger
   * tags:
   *   name: Dev
   *   description: Operations about developer app
   */

  /**
   * @swagger
   * /devs:
   *  get:
   *   tags: [Dev]
   *  description: Get all developers
   * responses:
   *  '200':
   *   description: A successful response
   *  schema:
   *  type: array
   * items:
   * $ref: '#/definitions/Dev'
   * '404':
   * description: No developers found
   * '500':
   * description: Internal server error
   *
   */
  router.get("/devs", getDevs);
  router.get("/devs/:id", getDevById);
  router.post("/devs", createDev);
  router.put("/devs/:id", updateDev);
  router.delete("/devs/:id", deleteDev);
  router.get("/devs/user/:user_id", getDevsByUserId);
  router.get("/devs/apiKey/:apiKey", getDevByApiKey);
};
