import request from "supertest";
import express from "express";
import {
  getAllDeliveries,
  getADeliveryById,
  getAllDeliveriesByUserId,
} from "../delivery";
import {
  getDeliveries,
  getDeliveryById,
  getDeliveriesByUserId,
} from "../../db/delivery";

jest.mock("../../db/delivery");

describe("getAllDeliveries", () => {
  it("should return 200 and all deliveries when deliveries exist", async () => {
    const mockDeliveries = [
      { id: 1, city: "New York" },
      { id: 2, city: "Los Angeles" },
    ];
    (getDeliveries as jest.Mock).mockResolvedValue(mockDeliveries);

    const app = express();
    app.get("/deliveries", getAllDeliveries);

    const res = await request(app).get("/deliveries");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDeliveries);
  });

  it("should return 404 when no deliveries exist", async () => {
    (getDeliveries as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/deliveries", getAllDeliveries);

    const res = await request(app).get("/deliveries");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getDeliveries as jest.Mock).mockRejectedValue(new Error("Test error"));

    const app = express();
    app.get("/deliveries", getAllDeliveries);

    const res = await request(app).get("/deliveries");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getADeliveryById", () => {
  it("should return 200 and the delivery when the delivery exists", async () => {
    const mockDelivery = { id: 1, city: "New York" };
    (getDeliveryById as jest.Mock).mockResolvedValue(mockDelivery);

    const app = express();
    app.get("/deliveries/:id", getADeliveryById);

    const res = await request(app).get("/deliveries/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDelivery);
  });
  it("should return 404 when the delivery does not exist", async () => {
    (getDeliveryById as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/deliveries/:id", getADeliveryById);

    const res = await request(app).get("/deliveries/1");

    expect(res.statusCode).toEqual(404);
  });
  it("should return 500 when an error occurs", async () => {
    (getDeliveryById as jest.Mock).mockRejectedValue(new Error("Test error"));

    const app = express();
    app.get("/deliveries/:id", getADeliveryById);

    const res = await request(app).get("/deliveries/1");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getAllDeliveriesByUserId", () => {
  it("should return 200 and all deliveries when deliveries exist", async () => {
    const mockDeliveries = [
      { id: 1, city: "New York" },
      { id: 2, city: "Los Angeles" },
    ];
    (getDeliveriesByUserId as jest.Mock).mockResolvedValue(mockDeliveries);

    const app = express();
    app.get("/deliveries/user/:id", getAllDeliveriesByUserId);

    const res = await request(app).get("/deliveries/user/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockDeliveries);
  });

  it("should return 404 when no deliveries exist", async () => {
    (getDeliveriesByUserId as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/deliveries/user/:id", getAllDeliveriesByUserId);

    const res = await request(app).get("/deliveries/user/1");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getDeliveriesByUserId as jest.Mock).mockRejectedValue(
      new Error("Test error")
    );

    const app = express();
    app.get("/deliveries/user/:id", getAllDeliveriesByUserId);

    const res = await request(app).get("/deliveries/user/1");

    expect(res.statusCode).toEqual(500);
  });
});
