export default function validateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      message: "API KEY inválida.",
    });
  }

  next();
}