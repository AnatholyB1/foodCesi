import express from "express";
import {logRequest} from "../middlewares"
import order from "./order"
import delivery from "./delivery";
import restaurants_categories from "./restaurants_categories";
import restaurant from "./restaurant";
import menu_items from './menu_items';
import order_items from './order_items';
const router = express.Router();

router.use(logRequest)

export default(): express.Router => {
    delivery(router)
    restaurant(router)
    restaurants_categories(router)
    menu_items(router)
    order_items(router)
    order(router)

    return router;
}