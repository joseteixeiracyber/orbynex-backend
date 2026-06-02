import cors from "cors";

const allowedOrigins = [
  "https://orbynex.com.br",
  "https://www.orbynex.com.br",
];

export default cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Origem não autorizada"));
  },

  credentials: true,
});