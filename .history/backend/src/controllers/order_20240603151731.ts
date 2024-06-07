import express  from "express";
import { getOrders, getOrderById, createOrder, updateOrder } from "../db/orders";
import { withLogging } from "../helpers";

export const getAllOrders = withLogging('getAllOrders',async(req: express.Request, res: express.Response) => {
    try {
        const orders = await getOrders();
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

export const getAnOrderById = withLogging('getAnOrderById',async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const order = await getOrderById(Number(id))
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

export const createAnOrder = withLogging('createAnOrder',async(req: express.Request, res: express.Response) => {
    try {
        const order = req.body
        const newOrder = await createOrder(order)
        return res.status(200).json(newOrder)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

export const updateAnOrder = withLogging('updateAnOrder',async(req: express.Request, res: express.Response) => {
    try {
        const id = Number(req.params.id);
        const order = req.body
        const updatedOrder = await updateOrder(id,order)
        return res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})

