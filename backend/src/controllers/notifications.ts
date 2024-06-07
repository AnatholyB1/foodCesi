import express from "express";
import { withLogging } from "../helpers";
import {
  getNotifications,
  getNotificationById,
  getNotificationsByUserId,
  deleteNotification,
  deleteNotificationsByUserId,
  markNotificationAsRead,
} from "../db/notifications";

export const getAllNotifications = withLogging(
  "getNotifications",
  async (req: express.Request, res: express.Response) => {
    try {
      const notifications = await getNotifications();
      if (!notifications) return res.status(404).end();
      res.status(200).json(notifications).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);


export const getNotification = withLogging(
  "getNotification",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      const notification = await getNotificationById(id);
      if (!notification) return res.status(404).end();
      res.json(notification).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);

export const getNotificationsByUser = withLogging(
  "getNotificationsByUser",
  async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).end();
      const notifications = await getNotificationsByUserId(userId);
      if (!notifications) return res.status(404).end();
      res.status(200).json(notifications).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);

export const removeNotification = withLogging(
  "removeNotification",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      await deleteNotification(id);
      res.status(200).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);

export const removeNotificationsByUser = withLogging(
  "removeNotificationsByUser",
  async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.params;
      if (!userId) return res.status(400).end();
      await deleteNotificationsByUserId(userId);
      res.status(200).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);


export const markNotification = withLogging(
  "markNotification",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      await markNotificationAsRead(id);
      res.status(200).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);

