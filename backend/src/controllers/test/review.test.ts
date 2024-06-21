import request from "supertest";
import express from "express";
import {
  getAllReviews,
  getReview,
  getReviewsByRestaurant
} from "../review"; // Remplacez par le chemin réel vers vos fonctions
import {
  getReviews,
  getReviewById,
  getReviewsByRestaurantId
} from "../../db/reviews"; // Remplacez par le chemin réel vers vos fonctions de base de données

jest.mock("../../db/reviews");

const app = express();
app.use(express.json());

app.get("/reviews", getAllReviews);
app.get("/reviews/:id", getReview);
app.get("/restaurants/:restaurant_id/reviews", getReviewsByRestaurant);

describe("getAllReviews", () => {
  it("should return 200 and all reviews when reviews exist", async () => {
    const mockReviews = [{ id: 1, review: "Great!" }, { id: 2, review: "Not bad." }];
    (getReviews as jest.Mock).mockResolvedValue(mockReviews);

    const res = await request(app).get("/reviews");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockReviews);
  });

  it("should return 404 when no reviews exist", async () => {
    (getReviews as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/reviews");

    expect(res.statusCode).toEqual(404);
  });

});

describe("getReview", () => {
  it("should return 200 and the review when the review exists", async () => {
    const mockReview = { id: 1, review: "Great!" };
    (getReviewById as jest.Mock).mockResolvedValue(mockReview);

    const res = await request(app).get("/reviews/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockReview);
  });

  it("should return 404 when the review does not exist", async () => {
    (getReviewById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/reviews/1");

    expect(res.statusCode).toEqual(404);
  });
});

describe("getReviewsByRestaurant", () => {
  it("should return 200 and reviews when reviews exist for the restaurant", async () => {
    const mockReviews = [{ id: 1, review: "Great!" }, { id: 2, review: "Not bad." }];
    (getReviewsByRestaurantId as jest.Mock).mockResolvedValue(mockReviews);

    const res = await request(app).get("/restaurants/1/reviews");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockReviews);
  });

  it("should return 404 when no reviews exist for the restaurant", async () => {
    (getReviewsByRestaurantId as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/restaurants/1/reviews");

    expect(res.statusCode).toEqual(404);
  });

});
