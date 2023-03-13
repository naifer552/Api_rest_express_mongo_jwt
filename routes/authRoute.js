import express from "express";
import { infoUser, login, register, refreshToken, logout } from "../controllers/authController.js";
import { bodyLoginValidator, bodyRegisterValidator, validationResultExpress } from "../middlewares/validationManager.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js"
const router = express.Router();

router.post('/login', bodyLoginValidator, login);
router.post('/register', bodyRegisterValidator, register);

router.get('/protected', requireToken, infoUser);
router.get('/refresh', requireRefreshToken,refreshToken);
router.get('/logout', logout);

export default router;