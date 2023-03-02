import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

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

        // Gemerar el token JWT
        const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET);

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export { register, login }