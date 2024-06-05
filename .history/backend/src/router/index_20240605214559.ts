import express from "express";
import authentication from "./authentication";
import users from "./users";
import {logRequest} from "../middlewares"
import log from "./log"
import order from "./order"
import delivery from "./delivery";
import address from "./address";
import restaurants_categories from "./restaurants_categories";

const router = express.Router();

router.use(logRequest)

export default(): express.Router => {
    address(router)
    delivery(router)
    restaurants_categories(router)
    order(router)
    log(router)
    authentication(router)
    users(router)
    return router;
}