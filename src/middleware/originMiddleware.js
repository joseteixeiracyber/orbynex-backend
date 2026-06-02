export default function validateOrigin(req, res, next) {
  const allowedOrigins = [
    "https://orbynex.com.br",
    "https://www.orbynex.com.br",
  ];

  const origin = req.headers.origin;

  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: "Origem não autorizada.",
    });
  }

  next();
}