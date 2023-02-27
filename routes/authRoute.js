import express from "express";
import { login, register } from "../controllers/authController.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
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


export default router;