import { getAllUsers } from "../users";
import express from "express";
import request from "supertest";

jest.mock("../../db/users");

describe("getAllUsers", () => {
    it("should return 200 and all users when users exist", async () => {
        const mockUsers = [
          { id: 1, username: "user1" },
          { id: 2, username: "user2" },
        ];
        (getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
    
        const app = express();
        app.get("/users", getAllUsers);
    
        const res = await request(app).get("/users");
    
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUsers);
    
})
})
