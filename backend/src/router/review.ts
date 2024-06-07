import express from "express";
import {getAllReviews,getReview,getReviewsByRestaurant,getReviewsByUser, updateReviewInfo, createNewReview, deleteReviewInfo, deleteReviewsByUser, deleteReviewsByRestaurant} from '../controllers/review';

export default (router: express.Router): void => {
    router.get('/reviews', getAllReviews);
    router.get('/reviews/:id', getReview);
    router.get('/reviews/restaurant/:restaurant_id', getReviewsByRestaurant);
    router.get('/reviews/user/:user_id', getReviewsByUser);
    router.put('/reviews/:id', updateReviewInfo);
    router.post('/reviews', createNewReview);
    router.delete('/reviews/:id', deleteReviewInfo);
    router.delete('/reviews/user/:user_id', deleteReviewsByUser);
    router.delete('/reviews/restaurant/:restaurant_id', deleteReviewsByRestaurant);
};