import { Router } from "express";

import corsMiddleware from "../middleware/corsMiddleware.js";
import validateOrigin from "../middleware/originMiddleware.js";
import validateApiKey from "../middleware/apiKeyMiddleware.js";
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

import { createContact } from "../controllers/contactController.js";

const router = Router();

router.post(
  "/contact",
  corsMiddleware,
  validateOrigin,
  validateApiKey,
  rateLimitMiddleware,
  createContact
);

export default router;