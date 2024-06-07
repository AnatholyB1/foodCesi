import express from "express";
import authentication from "./authentication";
import users from "./users";
import {logRequest} from "../middlewares"

const router = express.Router();

router.use(logRequest)

export default(): express.Router => {

    authentication(router)
    users(router)
    return router;
}