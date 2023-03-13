import express from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/linkController.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validationManager.js";

const router = express.Router();

router.get('/', requireToken, getLinks);
router.get('/:id', requireToken, getLink)
router.post('/', requireToken, bodyLinkValidator, createLink);
router.delete('/:id', requireToken, paramsLinkValidator, removeLink)

export default router;