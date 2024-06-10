import express from "express";
import users from "./users";
import {logRequest} from "../middlewares"


const router = express.Router();

router.use(logRequest)

export default(): express.Router => {
    users(router)
    return router;
}