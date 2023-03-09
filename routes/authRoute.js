import express from "express";
import { infoUser, login, register, refreshToken, logout } from "../controllers/authController.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = express.Router();

router.post('/login',[
    body('email', "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', 'Mínimo 6 caracteres')
    .trim()
    .isLength({min: 6}),
], 
validationResultExpress,
login);
router.post('/register',[
    body('email', "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password', 'Mínimo 6 caracteres')
    .trim()
    .isLength({min: 6}),
    body('password', 'Formato de contraseña incorrecta')
    .custom((value, {req}) => {
        if (value !== req.body.repassword) {
            throw new Error('No coinciden las contraseñas');
        };
        return value;
    })
],
validationResultExpress, 
register);

router.get('/protected', requireToken, infoUser);
router.get('/refresh', refreshToken);
router.get('/logout', logout);

export default router;