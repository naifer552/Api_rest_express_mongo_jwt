import express from "express";
import routerAuth from "./authRoute.js";
import routerLink from "./linkRoute.js";

function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/auth', routerAuth);
    router.use('/link', routerLink);
}

export default routerApi;

