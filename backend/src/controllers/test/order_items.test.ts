import request from "supertest";
import express from "express";
import {
  getAllOrderItems,
  getOrderItem,
  getOrderItemsByOrder
} from "../order_items"; // Remplacez par le chemin réel vers vos fonctions
import {
  getOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId
} from "../../db/orders_items"; // Remplacez par le chemin réel vers vos fonctions de base de données

jest.mock("../../db/orders_items");

const app = express();
app.use(express.json());

app.get("/order-items", getAllOrderItems);
app.get("/order-items/:id", getOrderItem);
app.get("/orders/:order_id/order-items", getOrderItemsByOrder);

describe("getAllOrderItems", () => {
  it("should return 200 and all order items when order items exist", async () => {
    const mockOrderItems = [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }];
    (getOrderItems as jest.Mock).mockResolvedValue(mockOrderItems);

    const res = await request(app).get("/order-items");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockOrderItems);
  });

  it("should return 404 when no order items exist", async () => {
    (getOrderItems as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/order-items");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getOrderItems as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/order-items");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getOrderItem", () => {
  it("should return 200 and the order item when the order item exists", async () => {
    const mockOrderItem = { id: 1, name: "Item 1" };
    (getOrderItemById as jest.Mock).mockResolvedValue(mockOrderItem);

    const res = await request(app).get("/order-items/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockOrderItem);
  });


  it("should return 404 when the order item does not exist", async () => {
    (getOrderItemById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/order-items/1");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getOrderItemById as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/order-items/1");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getOrderItemsByOrder", () => {
  it("should return 200 and order items when order items exist for the order", async () => {
    const mockOrderItems = [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }];
    (getOrderItemsByOrderId as jest.Mock).mockResolvedValue(mockOrderItems);

    const res = await request(app).get("/orders/1/order-items");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockOrderItems);
  });


  it("should return 404 when no order items exist for the order", async () => {
    (getOrderItemsByOrderId as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/orders/1/order-items");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getOrderItemsByOrderId as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/orders/1/order-items");

    expect(res.statusCode).toEqual(500);
  });
});