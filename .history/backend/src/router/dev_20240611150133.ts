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
