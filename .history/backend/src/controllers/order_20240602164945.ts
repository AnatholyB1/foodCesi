import express  from "express";
import { getOrders, getOrderById } from "db/orders";


export const getAllOrders = async(req: express.Request, res: express.Response) => {
    try {
        const orders = await getOrders();
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

export const getAnOrderById = async(req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const order = await getOrderById(Number(id))
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}