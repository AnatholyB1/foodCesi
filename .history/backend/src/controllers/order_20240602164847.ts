import express  from "express";
import { getOrders } from "db/orders";


export const getAllOrders = async(req: express.Request, res: express.Response) => {
    try {
        const orders = await getOrders();
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}