import {
  getLogs,
  getLogById,
  deleteLogs,
  deleteLog,
  getLogsByInfoType,
  getLogsByDate,
  getLogsByDateRange,
  getLogsByInfoTypeAndDateRange,
} from "../db/log";
import express from "express";
import { withLogging } from "../helpers";

export const getAllLogs = withLogging(
  "getAllLogs",
  async (req: express.Request, res: express.Response) => {
    try {
      // Filtering
      let filter = {};
      if (typeof req.query.filter === "string") {
        filter = JSON.parse(req.query.filter);
      }

      // Sorting
      let sort: { [key: string]: 1 | -1 } = {};
      if (typeof req.query.sort === "string") {
        const [sortField, sortOrder] = JSON.parse(req.query.sort);
        sort[sortField] = sortOrder === "ASC" ? 1 : -1;
      }

      // Pagination
      let range = [0, 9]; // Default range
      if (typeof req.query.range === "string") {
        range = JSON.parse(req.query.range);
      }

      // Query the database
      const total = await getLogs().countDocuments(filter);
      const logs = await getLogs()
        .find(filter)
        .sort(sort)
        .skip(range[0])
        .limit(range[1] - range[0] + 1);

      // Set headers and send response
      res.setHeader("Content-Range", `log ${range[0]}-${range[1]}/${total}`);
      res.setHeader("Access-Control-Expose-Headers", "Content-Range");


      return res.status(200).json(logs).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getALogById = withLogging(
  "getALogById",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const response = await getLogById(id);
      return res.status(200).json(response).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteAllLogs = withLogging(
  "deleteAllLogs",
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await deleteLogs();
      return res.status(200).json(response).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteALogById = withLogging(
  "deleteALogById",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const response = await deleteLog(id);
      return res.status(200).json(response).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAllLogsByInfoType = withLogging(
  "getAllLogsByInfoType",
  async (req: express.Request, res: express.Response) => {
    try {
      const { infoType } = req.params;
      const response = await getLogsByInfoType(infoType);
      return res.status(200).json(response).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAllLogsByDate = withLogging(
  "getAllLogsByDate",
  async (req: express.Request, res: express.Response) => {
    try {
      const { date } = req.params;
      const response = await getLogsByDate(new Date(date));
      return res.status(200).json(response).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAllLogsByDateRange = withLogging(
  "getAllLogsByDateRange",
  async (req: express.Request, res: express.Response) => {
    try {
      const { startDate, endDate } = req.params;
      const response = await getLogsByDateRange(
        new Date(startDate),
        new Date(endDate)
      );
      return res.status(200).json(response).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAllLogsByInfoTypeAndDateRange = withLogging(
  "getAllLogsByInfoTypeAndDateRange",
  async (req: express.Request, res: express.Response) => {
    try {
      const { infoType, startDate, endDate } = req.params;
      const response = await getLogsByInfoTypeAndDateRange(
        infoType,
        new Date(startDate),
        new Date(endDate)
      );
      return res.status(200).json(response).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);
