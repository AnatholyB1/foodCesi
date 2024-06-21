import express from "express";
import authentication from "./authentication";
import users from "./users";
import {logRequest} from "../middlewares"
import log from "./log"
import order from "./order"
import delivery from "./delivery";
import address from "./address";
import restaurants_categories from "./restaurants_categories";
import restaurant from "./restaurant";
import menu_items from './menu_items';
import notifications from './notification';
import order_items from './order_items';
import review from './review';
import dev from './dev';
import file from "./file";

const router = express.Router();

router.use(logRequest)

export default(): express.Router => {
    address(router)
    delivery(router)
    restaurant(router)
    restaurants_categories(router)
    menu_items(router)
    order_items(router)
    notifications(router)
    order(router)
    review(router)
    dev(router)
    log(router)
    authentication(router)
    users(router)
    file(router)
    return router;
}