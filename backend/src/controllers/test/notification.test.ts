import request from "supertest";
import express from "express";
import {
  getAllNotifications,
  getNotification,
  getNotificationsByUser
} from "../notifications"; // Remplacez par le chemin réel vers vos fonctions
import {
  getNotifications,
  getNotificationById,
  getNotificationsByUserId
} from "../../db/notifications"; // Remplacez par le chemin réel vers vos fonctions de base de données

jest.mock("../../db/notifications");

const app = express();
app.use(express.json());

app.get("/notifications", getAllNotifications);
app.get("/notifications/:id", getNotification);
app.get("/users/:userId/notifications", getNotificationsByUser);

describe("getAllNotifications", () => {
  it("should return 200 and all notifications when notifications exist", async () => {
    const mockNotifications = [
        { id: 1, userId: "1", message: "Notification 1" },
        { id: 2, userId: "2", message: "Notification 2" }
    ];
    (getNotifications as jest.Mock).mockResolvedValue(mockNotifications);

    const res = await request(app).get("/notifications");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockNotifications);
  });

  it("should return 404 when no notifications exist", async () => {
    (getNotifications as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/notifications");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getNotifications as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/notifications");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getNotification", () => {
  it("should return 200 and the notification when the notification exists", async () => {
    const mockNotifications = [
        { id: 1, userId: "1", message: "Notification 1" },
        { id: 2, userId: "2", message: "Notification 2" }
    ];
    (getNotificationById as jest.Mock).mockResolvedValue(mockNotifications);

    const res = await request(app).get("/notifications/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockNotifications);
  });

  it("should return 404 when the notification does not exist", async () => {
    (getNotificationById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/notifications/1");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getNotificationById as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/notifications/1");

    expect(res.statusCode).toEqual(500);
  });
});

describe("getNotificationsByUser", () => {
  it("should return 200 and notifications when notifications exist for the user", async () => {
    const mockNotifications = [
        { id: 1, userId: "1", message: "Notification 1" },
        { id: 2, userId: "2", message: "Notification 2" }
    ];
    (getNotificationsByUserId as jest.Mock).mockResolvedValue(mockNotifications);

    const res = await request(app).get("/users/1/notifications");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockNotifications);
  });


  it("should return 404 when no notifications exist for the user", async () => {
    (getNotificationsByUserId as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/users/1/notifications");

    expect(res.statusCode).toEqual(404);
  });

  it("should return 500 when an error occurs", async () => {
    (getNotificationsByUserId as jest.Mock).mockRejectedValue(new Error("Test error"));

    const res = await request(app).get("/users/1/notifications");

    expect(res.statusCode).toEqual(500);
  });
});