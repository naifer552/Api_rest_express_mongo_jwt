import { validationResult } from "express-validator";

const register = (req, res) => {
    res.json({ ok: 'register' });
};


const login = (req, res) => {
    res.json({ ok: 'login' });
}

export { register, login }