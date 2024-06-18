import request from "supertest";
import express from "express";
import {getDevs, getADevById, getAllDevByUserId} from "../dev";
import {getDev, getDevById, getDevByUserId} from "../../db/dev";

jest.mock("../../db/dev");

describe("getDevs", () => {
  it("should return 200 and all devs when devs exist", async () => {
    const mockDevs = [
      { id: 1, appName: "app1" },
      { id: 2, appName: "app2" },
    ];
    (getDev as jest.Mock).mockResolvedValue(mockDevs);

    const app = express();
    app.get("/devs", getDevs);

    const res = await request(app).get("/devs");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDevs);
  });

  it("should return 404 when no devs exist", async () => {
    (getDev as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/devs", getDevs);

    const res = await request(app).get("/devs");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getDev as jest.Mock).mockRejectedValue(new Error("Test error"));

    const app = express();
    app.get("/devs", getDevs);

    const res = await request(app).get("/devs");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getADevById", () => {
  it("should return 200 and the dev when the dev exists", async () => {
    const mockDev = { id: 1, appName: "app1" };
    (getDevById as jest.Mock).mockResolvedValue(mockDev);

    const app = express();
    app.get("/devs/:id", getADevById);

    const res = await request(app).get("/devs/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDev);
  });

  it("should return 404 when the dev does not exist", async () => {
    (getDevById as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/devs/:id", getADevById);

    const res = await request(app).get("/devs/1");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getDevById as jest.Mock).mockRejectedValue(new Error("Test error"));

    const app = express();
    app.get("/devs/:id", getADevById);

    const res = await request(app).get("/devs/1");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getAllDevByUserId", () => {
  it("should return 200 and the dev when the dev exists", async () => {
    const mockDev = { id: 1, appName: "app1" };
    (getDevByUserId as jest.Mock).mockResolvedValue(mockDev);

    const app = express();
    app.get("/devs/user/:user_id", getAllDevByUserId);

    const res = await request(app).get("/devs/user/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDev);
  });

  it("should return 404 when the dev does not exist", async () => {
    (getDevByUserId as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/devs/user/:id", getAllDevByUserId);

    const res = await request(app).get("/devs/user/1");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getDevByUserId as jest.Mock).mockRejectedValue(new Error("Test error"));

    const app = express();
    app.get("/devs/user/:id", getAllDevByUserId);

    const res = await request(app).get("/devs/user/1");

    expect(res.statusCode).toEqual(500);
  });
});