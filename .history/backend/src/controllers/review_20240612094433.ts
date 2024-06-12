import express from "express";
import { withLogging } from "../helpers";

import {
  getReviews,
  getReviewById,
  getReviewsByRestaurantId,
  getReviewsByUserId,
  updateReview,
  createReview,
  deleteReview,
  deleteReviewsByUserId,
  deleteReviewsByRestaurantId,
} from "../db/reviews";

export const getAllReviews = withLogging(
  "getAllReviews",
  async (req: express.Request, res: express.Response) => {
    try {
      const reviews = await getReviews();
      if (!reviews) {
        return res.status(404).end();
      }
      return res.status(200).json(reviews).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getReview = withLogging(
  "getReview",
  async (req: express.Request, res: express.Response) => {
    try {
      const review = await getReviewById(req.params.id);
      if (!review) {
        return res.status(404).end();
      }
      return res.status(200).json(review).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getReviewsByRestaurant = withLogging(
  "getReviewsByRestaurant",
  async (req: express.Request, res: express.Response) => {
    try {
      const reviews = await getReviewsByRestaurantId(
        Number(req.params.restaurant_id)
      );
      if (!reviews) {
        return res.status(404).end();
      }
      return res.status(200).json(reviews).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getReviewsByUser = withLogging(
  "getReviewsByUser",
  async (req: express.Request, res: express.Response) => {
    try {
      const reviews = await getReviewsByUserId(Number(req.params.user_id));
      if (!reviews) {
        return res.status(404).end();
      }
      return res.status(200).json(reviews).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const updateReviewInfo = withLogging(
  "updateReviewInfo",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      const review = await updateReview(id, req.body);
      if (!review) {
        return res.status(404).end();
      }
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const createNewReview = withLogging(
  "createNewReview",
  async (req: express.Request, res: express.Response) => {
    try {
      const { restaurantId, userId, rating, comment } = req.body;
      if (!restaurantId || !userId || !rating || !comment)
        return res.status(400).end();
      const review_values = {
        restaurantId,
        userId: Number(userId),
        rating: Number(rating),
        comment,
      };
      const review = await createReview(review_values);
      if (!review) {
        return res.status(404).end();
      }
      return res.status(200).json(review).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteReviewInfo = withLogging(
  "deleteReviewInfo",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      const review = await deleteReview(id);
      if (!review) {
        return res.status(404).end();
      }
      return res.status(200).json(review).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteReviewsByUser = withLogging(
  "deleteReviewsByUser",
  async (req: express.Request, res: express.Response) => {
    try {
      const { user_id } = req.params;
      if (!user_id) return res.status(400).end();
      const reviews = await deleteReviewsByUserId(Number(user_id));
      if (!reviews) {
        return res.status(404).end();
      }
      return res.status(200).json(reviews).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);


export const deleteReviewsByRestaurant = withLogging(
  "deleteReviewsByRestaurant",
  async (req: express.Request, res: express.Response) => {
    try {
      const { restaurant_id } = req.params;
      if (!restaurant_id) return res.status(400).end();
      const reviews = await deleteReviewsByRestaurantId(Number(restaurant_id));
      if (!reviews) {
        return res.status(404).end();
      }
      return res.status(200).json(reviews).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);
