import express from 'express';
import {getAllNotifications, getNotification, getNotificationsByUser, removeNotification, removeNotificationsByUser, markNotification} from '../controllers/notifications';

export default (router: express.Router) => {
    router.get('/notifications', getAllNotifications);
    router.get('/notifications/:id', getNotification);
    router.get('/notifications/user/:userId', getNotificationsByUser);
    router.delete('/notifications/:id', removeNotification);
    router.delete('/notifications/user/:userId', removeNotificationsByUser);
    router.put('/notifications/:id', markNotification);
}
