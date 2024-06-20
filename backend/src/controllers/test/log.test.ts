import request from "supertest";
import express from "express";
import {
    getALogById,
    getAllLogsByInfoType,
    deleteALogById,
  } from "../log";
import {
    getLogById,
    deleteLog,
    getLogsByInfoType,
} from "../../db/log";

jest.setTimeout(10000);

jest.mock("../../db/log");

const app = express();
app.use(express.json());
app.get("/logs/:id", getALogById);
app.get("/logs/infoType/:infoType", getAllLogsByInfoType);
app.delete("/logs/:id", deleteALogById);

describe("getLogById", () => {
    it("should return 200 and the log when the log exists", async () => {
        const mockLog = { id: 1, message: "Success deleteAllLogs", level: "info", timestamp: "2024-06-18T13:01:02.240Z" };
      (getLogById as jest.Mock).mockResolvedValue(mockLog);

      const app = express();
      app.get("/logs/:id", getALogById);
  
      const res = await request(app).get("/logs/1");
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockLog);
    });
  
    it("should return 404 when the log does not exist", async () => {
      (getLogById as jest.Mock).mockResolvedValue(null);
  
      const app = express();
      app.get("/logs/:id", getALogById);

      const res = await request(app).get("/logs/");
  
      expect(res.statusCode).toEqual(404);
    });
  
    // it("should return 500 when an error occurs", async () => {
    //   (getLogById as jest.Mock).mockRejectedValue(new Error("Test error"));
  
    //   const app = express();
    //   app.get("/logs/:id", getALogById);

    //   const res = await request(app).get("/logs/1");
  
    //   expect(res.statusCode).toEqual(500);
    // });
});
  
describe("getAllLogsByInfoType", () => {
    it("should return 200 and all logs when logs exist", async () => {
        const mockLogs = [
            { id: 1, message: "Success deleteAllLogs", level: "info", timestamp: "2024-06-18T13:01:02.240Z" },
            { id: 2, message: "Success getAllLogs", level: "info", timestamp: "2024-06-03T12:26:23.293Z" },
          ];
      (getLogsByInfoType as jest.Mock).mockResolvedValue(mockLogs);
  
      const app = express();
      app.get("/logs/infoType/:infoType", getAllLogsByInfoType);
      
      const res = await request(app).get("/logs/infoType/info");
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockLogs);
    });
  
    it("should return 404 when no logs exist", async () => {
      (getLogsByInfoType as jest.Mock).mockResolvedValue(null);
  
      const app = express();
      app.get("/logs/infoType/:infoType", getAllLogsByInfoType);

      const res = await request(app).get("/logs/infoType/");
  
      expect(res.statusCode).toEqual(404);
    });
  
    // it("should return 500 when an error occurs", async () => {
    //   (getLogsByInfoType as jest.Mock).mockRejectedValue(new Error("Test error"));
  
    //   const app = express();
    //   app.get("/logs/infoType/:infoType", getAllLogsByInfoType);

    //   const res = await request(app).get("/logs/infoType/info");
  
    //   expect(res.statusCode).toEqual(500);
    // });
});


describe("deleteALogById", () => {
  it("should return 200 and the response when log is deleted successfully", async () => {
    const mockResponse = { message: "Log deleted successfully" };
    (deleteLog as jest.Mock).mockResolvedValue(mockResponse);

    app.delete("/logs/:id", deleteALogById);

    const res = await request(app).delete("/logs/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockResponse);
  });

  // it("should return 500 when an error occurs", async () => {
  //   (deleteLog as jest.Mock).mockRejectedValue(new Error("Test error"));

  //   app.delete("/logs/:id", deleteALogById);

  //   const res = await request(app).delete("/logs/1");

  //   expect(res.statusCode).toEqual(500);
  // });
});