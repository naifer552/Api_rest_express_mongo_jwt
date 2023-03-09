import jwt from "jsonwebtoken"
export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) {
            throw new Error('No existe el token en el header. Usa Bearer');
        }
        token = token.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = payload.uid;
        next();  
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: error.message})    
    };
};