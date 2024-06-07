import mongoose, { Schema, Document } from 'mongoose';

interface INotification extends Document {
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
