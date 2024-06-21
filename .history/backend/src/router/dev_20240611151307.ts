import express from "express";
import {
  getDevs,
  getADevById,
  createADev,
  updateADev,
  deleteADev,
  getAllDevByUserId,
  getADevByApiKey,
} from "../controllers/dev";

export default (router: express.Router) => {
  /**
   * @swagger
   * tags:
   *   name: Dev
   *   description: Operations about developer app
   */

  router.get("/devs", getDevs);
  router.get("/devs/:id", getADevById);
  router.post("/devs", createADev);
  router.put("/devs/:id", updateADev);
  router.delete("/devs/:id", deleteADev);
  router.get("/devs/user/:user_id", getAllDevByUserId);
  router.get("/devs/apiKey/:apiKey", getADevByApiKey);
};
