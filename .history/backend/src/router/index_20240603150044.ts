import express from "express";
import authentication from "./authentication";
import users from "./users";
import {logRequest} from "../middlewares"
import log from "./log"

const router = express.Router();

router.use(logRequest)

export default(): express.Router => {

    log(router)
    authentication(router)
    users(router)
    return router;
}