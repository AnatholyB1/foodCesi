import request from "supertest";
import express from "express";
import {
  getAllOrders,
  getAnOrderById,
  getAllOrdersByUserId
} from "../order"; // Remplacez par le chemin réel vers vos fonctions
import { getOrders, getOrderById, getOrdersByUserId } from "../../db/orders"; // Remplacez par le chemin réel vers vos fonctions de base de données

jest.setTimeout(10000);
jest.mock("../../db/orders");

const app = express();
app.use(express.json());

app.get("/orders", getAllOrders);
app.get("/orders/:id", getAnOrderById);
app.get("/users/:user_id/orders", getAllOrdersByUserId);

describe("getAnOrderById", () => {
  it("should return 200 and the order when the order exists", async () => {
    const mockOrders = [
        { id: 1, user_id: 1, restaurant_id: 1, delivery_id: 1, address_id: 1, total_price: 15, status: "En cours de prépa" },
        { id: 1, user_id: 2, restaurant_id: 1, delivery_id: 2, address_id: 2, total_price: 15, status: "En cours de livraison" }
    ];
    (getOrderById as jest.Mock).mockResolvedValue(mockOrders);

    const res = await request(app).get("/orders/1");

    expect(res.statusCode).toEqual(200);
  });

  it("should return 404 when an error occurs", async () => {
    (getOrderById as jest.Mock).mockRejectedValue(null);

    const res = await request(app).get("/orders//1");

    expect(res.statusCode).toEqual(404);
  });
});

describe("getAllOrdersByUserId", () => {
  it("should return 200 and orders for the user", async () => {
    const mockOrders = [
        { id: 1, user_id: 1, restaurant_id: 1, delivery_id: 1, address_id: 1, total_price: 15, status: "En cours de prépa" },
        { id: 1, user_id: 2, restaurant_id: 1, delivery_id: 2, address_id: 2, total_price: 15, status: "En cours de livraison" }
    ];
    (getOrdersByUserId as jest.Mock).mockResolvedValue(mockOrders);

    const res = await request(app).get("/users/1/orders");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockOrders);
  });

  it("should return 404 when an error occurs", async () => {
    (getOrdersByUserId as jest.Mock).mockRejectedValue(null);

    const res = await request(app).get("/users/1//orders");

    expect(res.statusCode).toEqual(404);
  });
});