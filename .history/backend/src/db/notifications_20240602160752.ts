import e from 'express';
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
export const getNotifications = () => Notification.find();
export const getNotificationById = (id: string) => Notification.findById(id);
export const getNotificationsByUserId = (userId: string) => Notification.find({ userId });
export const createNotification = (notification: Record<string, any>) => Notification.create(notification);
export const updateNotification = (id: string, values: Record<string, any>) => Notification.findByIdAndUpdate(id, values);
export const deleteNotification = (id: string) => Notification.findByIdAndDelete(id);
export const deleteNotificationsByUserId = (userId: string) => Notification.deleteMany({ userId });
