import express from 'express';

import {getAlLogs } from '../controllers/log'


export default (router: express.Router) => {
    router.post('/log', getAlLogs);
}