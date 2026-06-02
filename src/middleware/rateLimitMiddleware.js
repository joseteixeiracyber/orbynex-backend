import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  message: {
    success: false,
    message:
      "Muitas solicitações. Tente novamente em alguns minutos.",
  },
});