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
