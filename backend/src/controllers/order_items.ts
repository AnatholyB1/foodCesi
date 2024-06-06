import express from 'express';
import { withLogging } from '../helpers';
import { getOrderItems, getOrderItemById,getOrderItemsByOrderId,  updateOrderItem, updateOrderItemsByOrderId, deleteOrderItem, deleteOrderItemsByOrderId} from '../db/orders_items';


export const getAllOrderItems = withLogging(
    "getAllOrderItems",
    async (req: express.Request, res: express.Response) => {
        try {
            const orderItems = await getOrderItems();
            if (!orderItems) return res.status(404).end();
            res.status(200).json(orderItems).end();
        } catch (e) {
            res.status(500).json(e).end();
        }
    }
);

export const getOrderItem = withLogging(
    "getOrderItem",
    async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).end();
            const orderItem = await getOrderItemById(parseInt(id));
            if (!orderItem) return res.status(404).end();
            res.json(orderItem).end();
        } catch (e) {
            res.status(500).json(e).end();
        }
    }
);

export const getOrderItemsByOrder = withLogging(
    "getOrderItemsByOrder",
    async (req: express.Request, res: express.Response) => {
        try {
            const { order_id } = req.params;
            if (!order_id) return res.status(400).end();
            const orderItems = await getOrderItemsByOrderId(parseInt(order_id));
            if (!orderItems) return res.status(404).end();
            res.status(200).json(orderItems).end();
        } catch (e) {
            res.status(500).json(e).end();
        }
    }
);


export const removeOrderItem = withLogging(
    "removeOrderItem",
    async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).end();
            await deleteOrderItem(parseInt(id));
            res.status(204).end();
        } catch (e) {
            res.status(500).json(e).end();
        }
    }
);


export const removeOrderItemsByOrder = withLogging(
    "removeOrderItemsByOrder",
    async (req: express.Request, res: express.Response) => {
        try {
            const { order_id } = req.params;
            if (!order_id) return res.status(400).end();
            await deleteOrderItemsByOrderId(parseInt(order_id));
            res.status(204).end();
        } catch (e) {
            res.status(500).json(e).end();
        }
    }
);


export const updateOrderItemById = withLogging(
    "updateOrderItemById",
    async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            const {values} = req.body;
            if (!id) return res.status(400).end();
            await updateOrderItem(parseInt(id), values);
            res.status(204).end();
        } catch (e) {
            res.status(500).json(e).end();
        }
    }
);

export const updateOrderItemsByOrder = withLogging(
    "updateOrderItemsByOrder",
    async (req: express.Request, res: express.Response) => {
        try {
            const { order_id } = req.params;
            const {values} = req.body;
            if (!order_id) return res.status(400).end();
            await updateOrderItemsByOrderId(parseInt(order_id), values);
            res.status(204).end();
        } catch (e) {
            res.status(500).json(e).end();
        }
    }
);


