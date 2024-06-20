import request from "supertest";
import express from "express";
import {
  getItems,
  getItemById,
  getItemsByRestaurantId
} from "../menu_items";
import {
  getMenuItems,
  getMenuItemById,
  getMenuItemsByRestaurantId
} from "../../db/menu_items";

jest.mock("../../db/menu_items");

const app = express();
app.use(express.json());

app.get("/items", getItems);
app.get("/items/:id", getItemById);
app.get("/restaurants/:restaurant_id/items", getItemsByRestaurantId);

describe("getItems", () => {
  it("should return 200 and items when items exist", async () => {
    const mockItems = [
        { id: 1, restaurant_id: 1, name: "Item 1", description: "Blabla", price:"11€" },
        { id: 2, restaurant_id: 1, name: "Item 2", description: "Blableu", price:"5€" },
    ];
    (getMenuItems as jest.Mock).mockResolvedValue(mockItems);

    const res = await request(app).get("/items");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockItems);
  });

  it("should return 404 when no items exist", async () => {
    (getMenuItems as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/items");

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ message: "no items" });
  });

  it("should return 500 when an error occurs", async () => {
    (getMenuItems as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/items");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getItemById", () => {
  it("should return 200 and the item when the item exists", async () => {
    const mockItem = [
        { id: 1, restaurant_id: 1, name: "Item 1", description: "Blabla", price:"11€" },
        { id: 2, restaurant_id: 1, name: "Item 2", description: "Blableu", price:"5€" },
    ];
    (getMenuItemById as jest.Mock).mockResolvedValue(mockItem);

    const res = await request(app).get("/items/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockItem);
  });

  it("should return 404 when the item does not exist", async () => {
    (getMenuItemById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/items/1");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getMenuItemById as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/items/1");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getItemsByRestaurantId", () => {
  it("should return 200 and items when items exist", async () => {
    const mockItems = [
        { id: 1, restaurant_id: 1, name: "Item 1", description: "Blabla", price:"11€" },
        { id: 2, restaurant_id: 1, name: "Item 2", description: "Blableu", price:"5€" },
    ];
    (getMenuItemsByRestaurantId as jest.Mock).mockResolvedValue(mockItems);

    const res = await request(app).get("/restaurants/1/items");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockItems);
  });

  it("should return 404 when no items exist", async () => {
    (getMenuItemsByRestaurantId as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/restaurants/1/items");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getMenuItemsByRestaurantId as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/restaurants/1/items");

    expect(res.statusCode).toEqual(500);
  });
});
