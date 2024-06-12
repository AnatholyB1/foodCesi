import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  restaurantId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  restaurantId: { type: Number, required: true },
  userId: { type: Number, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model<IReview>('Review', ReviewSchema);


export default Review;
export const getReviews = () => Review.find()
export const getReviewById = (id:string) => Review.findById(id)
export const getReviewsByRestaurantId = (restaurantId:number) => Review.find({restaurantId})
export const getReviewsByUserId = (userId:number) => Review.find({userId})
export const updateReview = (id : string, values: Record<string, any>) => Review.findByIdAndUpdate(id,values) 
export const createReview = (values: Record<string, any>) => Review.create(values)
export const deleteReview = (id: string) => Review.findByIdAndDelete(id)
export const deleteReviewsByUserId = (userId: number) => Review.deleteMany({userId})
export const deleteReviewsByRestaurantId = (restaurantId:number) => Review.deleteMany({restaurantId})
