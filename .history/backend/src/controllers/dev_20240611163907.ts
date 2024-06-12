import express from "express";
import { withLogging } from "../helpers";
import {
  getDev,
  getDevById,
  createDev,
  updateDev,
  deleteDev,
  getDevByUserId,
  getDevByApiKey,
} from "../db/dev";

export const getDevs = withLogging(
  "getDevs",
  async (req: express.Request, res: express.Response) => {
    try {
      const devs = await getDev();
      if (!devs) return res.status(404).json({ message: "no devs" }).end();
      return res.status(200).json(devs).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const getADevById = withLogging(
  "getDevById",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      const dev = await getDevById(Number(id));
      if (!dev) return res.status(404).end();
      return res.json(dev).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const createADev = withLogging(
  "createDev",
  async (req: express.Request, res: express.Response) => {
    try {
      const { user_id, appName } = req.body;

      //create an apiKey for dev usage of our endpoints
      const apiKey =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      if (!user_id || !apiKey || !appName)
        return res.status(400).json({ message: "missing parameters" }).end();
      console.log('here')
      const values = { user_id, apiKey, appName };
      const dev = await createDev(values);
      if (!dev) return res.status(404).end();
      return res.status(201).json(dev).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const updateADev = withLogging(
  "updateDev",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      const { appName, user_id } = req.body;
      const values = { appName, user_id };
      const dev = await updateDev(Number(id), values);
      if (!dev) return res.status(404).end();
      return res.json(dev).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const deleteADev = withLogging(
  "deleteDev",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      await deleteDev(Number(id));
      return res.status(204).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const getAllDevByUserId = withLogging(
  "getDevsByUserId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { user_id } = req.params;
      if (!user_id) return res.status(400).end();
      const devs = await getDevByUserId(Number(user_id));
      if (!devs) return res.status(404).end();
      return res.status(200).json(devs).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const getADevByApiKey = withLogging(
  "getDevByApiKey",
  async (req: express.Request, res: express.Response) => {
    try {
      const { apiKey } = req.params;
      if (!apiKey) return res.status(400).end();
      const dev = await getDevByApiKey(apiKey);
      if (!dev) return res.status(404).end();
      return res.status(200).json(dev).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);
