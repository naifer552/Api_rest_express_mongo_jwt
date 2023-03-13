import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";
export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid });
        return res.json({ links });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de server"});
        
    }
};

export const getLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (link.uid.equals(req.uid)) {
            return res.status(401).json({ error: 'No le pertenece ese link' });
        }
        if (!link) {
            return res.status(404).json({ error: 'No existe el link' });
        }
        return res.json({ link });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de server"});
        
    }
};

export const removeLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (link.uid.equals(req.uid)) {
            return res.status(401).json({ error: 'No le pertenece ese link' });
        }
        if (!link) {
            return res.status(404).json({ error: 'No existe el link' });
        };

        await link.remove();
        return res.json({ link });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de server"});
        
    }
};

export const createLink = async(req, res) => {
    try {
        const { longLink } = req.body;
        const link = new Link({ longLink, nanolink: nanoid(6), uid: req.uid })
        await link.save();
        return res.status(201).json({ link });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de server"});
        
    }
};

export const updateLink = async(req, res) => {
    try {
        const { id } = req.params;
        const { longLink } = req.body;
        const link = await Link.findById(id);
        if (link.uid.equals(req.uid)) {
            return res.status(401).json({ error: 'No le pertenece ese link' });
        }
        if (!link) {
            return res.status(404).json({ error: 'No existe el link' });
        };

        link.longLink = longLink;
        await link.save();
        return res.json({ link });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de server"});
        
    }
}