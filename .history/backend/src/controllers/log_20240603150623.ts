import { getLogs, getLogById, deleteLogs, deleteLog } from "../db/log";
import express from "express";
import {withLogging} from '../helpers'


export const getAlLogs = withLogging('getAlLogs',async (req: express.Request, res: express.Response) => {
    try {
        const response = await getLogs()
        return res.status(200).json(response).end()
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})