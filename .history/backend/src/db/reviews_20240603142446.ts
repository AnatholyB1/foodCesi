import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  restaurantId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  restaurantId: { type: String, required: true },
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model<IReview>('Review', ReviewSchema);


export default Review;
export const getReviews = () => Review.find()
export const getReviewById = (id:string) => Review.findById(id)
export const getReviewsByRestaurantId = (restaurantId:string) => Review.find({restaurantId})
export const getReviewsByUserId = (userId:string) => Review.find({userId})
export const updateReview = (id : string, values: IReview) => Review.findByIdAndUpdate(id,values) 
export const createReview = (values: IReview) => Review.create(values)
export const deleteReview = (id: string) => Review.findByIdAndDelete(id)
export const deleteReviewsByUserId = (userId: string) => Review.deleteMany({userId})
export const deleteReviewsByRestaurantId = (restaurantId:string) => Review.deleteMany({restaurantId})
