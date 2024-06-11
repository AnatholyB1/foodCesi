import express from "express";
import {
  getDevs,
  getDevById,
  createDev,
  updateDev,
  deleteDev,
  getAllDevByUserId,
  getDevByApiKey,
} from "../controllers/dev";

export default (router: express.Router) => {
  /**
   * @swagger
   * tags:
   *   name: Dev
   *   description: Operations about developer app
   */

  router.get("/devs", getDevs);
  router.get("/devs/:id", getDevById);
  router.post("/devs", createDev);
  router.put("/devs/:id", updateDev);
  router.delete("/devs/:id", deleteDev);
  router.get("/devs/user/:user_id", getAllDevByUserId);
  router.get("/devs/apiKey/:apiKey", getDevByApiKey);
};
