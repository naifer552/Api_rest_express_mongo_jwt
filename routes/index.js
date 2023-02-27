import express from "express";
import routerAuth from "./authRoute.js";

function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/auth', routerAuth);
}

export default routerApi;

