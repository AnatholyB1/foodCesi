import request from "supertest";
import express from "express";
import {
  getAllAddresses,
  getAddress,
  getAddressesByUser,
  createNewAddress,
} from "../address";
import {
  getAddresses,
  getAddressById,
  getAddressesByUserId,
  createAddress,
} from "../../db/addresses";

jest.mock("../../db/addresses");

describe("getAllAddresses", () => {
  it("should return 200 and all addresses when addresses exist", async () => {
    const mockAddresses = [
      { id: 1, street: "123 Main St" },
      { id: 2, street: "456 Oak St" },
    ];
    (getAddresses as jest.Mock).mockResolvedValue(mockAddresses);

    const app = express();
    app.get("/addresses", getAllAddresses);

    const res = await request(app).get("/addresses");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockAddresses);
  });

  it("should return 404 when no addresses exist", async () => {
    (getAddresses as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/addresses", getAllAddresses);

    const res = await request(app).get("/addresses");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getAddresses as jest.Mock).mockRejectedValue(new Error("Test error"));

    const app = express();
    app.get("/addresses", getAllAddresses);

    const res = await request(app).get("/addresses");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getAddress", () => {
  it("should return 200 and the address when the address exists", async () => {
    const mockAddress = { id: 1, street: "123 Main St" };
    (getAddressById as jest.Mock).mockResolvedValue(mockAddress);

    const app = express();
    app.get("/addresses/:id", getAddress);

    const res = await request(app).get("/addresses/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockAddress);
  });

  it("should return 404 when the address does not exist", async () => {
    (getAddressById as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/addresses/:id", getAddress);

    const res = await request(app).get("/addresses/1");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getAddressById as jest.Mock).mockRejectedValue(new Error("Test error"));

    const app = express();
    app.get("/addresses/:id", getAddress);

    const res = await request(app).get("/addresses/1");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getAddressesByUser", () => {
  it("should return 200 and all addresses when addresses exist", async () => {
    const mockAddresses = [
      { id: 1, street: "123 Main St" },
      { id: 2, street: "456 Oak St" },
    ];
    (getAddressesByUserId as jest.Mock).mockResolvedValue(mockAddresses);

    const app = express();
    app.get("/addresses/user/:user_id", getAddressesByUser);

    const res = await request(app).get("/addresses/user/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockAddresses);
  });

  it("should return 404 when no addresses exist", async () => {
    (getAddressesByUserId as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.get("/addresses/user/:user_id", getAddressesByUser);

    const res = await request(app).get("/addresses/user/1");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getAddressesByUserId as jest.Mock).mockRejectedValue(
      new Error("Test error")
    );

    const app = express();
    app.get("/addresses/user/:user_id", getAddressesByUser);

    const res = await request(app).get("/addresses/user/1");

    expect(res.statusCode).toEqual(500);
  });
});

describe("createNewAddress", () => {
  it("should return 201 and the new address when the address is created", async () => {
    const mockAddress = { id: 1, street: "123 Main St" };
    (createAddress as jest.Mock).mockResolvedValue(mockAddress);

    const app = express();
    app.post("/addresses", createNewAddress);

    const res = await request(app)
      .post("/addresses")
      .send({ user_id: 1, street: "123 Main St" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockAddress);
  });

  it("should return 400 when missing required fields", async () => {
    const app = express();
    app.post("/addresses", createNewAddress);

    const res = await request(app).post("/addresses").send({});

    expect(res.statusCode).toEqual(400);
  });

  it("should return 404 when the address is not created", async () => {
    (createAddress as jest.Mock).mockResolvedValue(null);

    const app = express();
    app.post("/addresses", createNewAddress);

    const res = await request(app)
      .post("/addresses")
      .send({ user_id: 1, street: "123 Main St" });

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (createAddress as jest.Mock).mockRejectedValue(new Error("Test error"));

    const app = express();
    app.post("/addresses", createNewAddress);

    const res = await request(app)
      .post("/addresses")
      .send({ user_id: 1, street: "123 Main St" });

    expect(res.statusCode).toEqual(500);
  });
});
