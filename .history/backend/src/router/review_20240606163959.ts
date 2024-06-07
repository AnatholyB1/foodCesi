import express from "express";
import {getAllReviews,getReview,getReviewsByRestaurant,getReviewsByUser, updateReviewInfo, createNewReview, deleteReviewInfo, deleteReviewsByUser, deleteReviewsByRestaurant} from '../controllers/review';
