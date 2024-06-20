import { getAUserById } from "../users";
import { getUserById } from "../../db/users";
import express from "express";
import request from "supertest";

jest.mock("../../db/users");

describe("getAUserById", () => {
    it("should return 200 and the user when the user exists", async () => {
        const mockUser = { id: 1, username: "user1" };
        (getUserById as jest.Mock).mockResolvedValue(mockUser);

        const app = express();
        app.get("/users/:id", getAUserById);

        const res = await request(app).get("/users/1");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUser);
    });
    it("should return 404 when the user does not exist", async () => {
        (getUserById as jest.Mock).mockResolvedValue(null);

        const app = express();
        app.get("/users/:id", getAUserById);

        const res = await request(app).get("/users/1");

        expect(res.statusCode).toEqual(404);
    });
});