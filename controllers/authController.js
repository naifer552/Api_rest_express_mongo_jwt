import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        return res.status(201).json({ ok: true });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({error: 'Ya existe un usuario con este email'});
        }; 
        return res.status(500).json({ error: "Error de servidor" });
    };
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ error: "No existe este usuario" });
        }

        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword) {
            return res.status(403).json({ error: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res)
        return res.status(200).json({token, expiresIn});
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" });
    }
};

const infoUser = async(req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        res.json({ email: user.email });
    } catch (error) {
        return res.status(500).json({error: "Error de server"});
    }
};

const refreshToken = (req, res) => {
    try {
        const refreshTokenCookie =req.cookies.refreshToken;
        if (!refreshTokenCookie) {
            throw new Error('No existe el token');
        }
        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        const { token, expiresIn } = generateToken(uid);
        return res.status(200).json({token, expiresIn});
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ ok:true });
};

export { register, login, infoUser, refreshToken, logout };
