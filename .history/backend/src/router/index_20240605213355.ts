import express from "express";
import authentication from "./authentication";
import users from "./users";
import {logRequest} from "../middlewares"
import log from "./log"
import order from "./order"
import delivery from "./delivery";
import address from "./address";

const router = express.Router();

router.use(logRequest)

export default(): express.Router => {
    address(router)
    delivery(router)
    
    order(router)
    log(router)
    authentication(router)
    users(router)
    return router;
}