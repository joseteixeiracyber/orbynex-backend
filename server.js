
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://orbynex.com.br",
  "https://www.orbynex.com.br",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origem não permitida"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    if (!name || !email || !phone || !company || !message) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos.",
      });
    }

    await axios.post(process.env.N8N_WEBHOOK_URL, {
      name,
      email,
      phone,
      company,
      message,
      source: "Site Orbynex",
      type: "Solicitação de contato",
      createdAt: new Date().toISOString(),
    });

    return res.json({
      success: true,
      message: "Solicitação enviada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao enviar para n8n:", error.message);

    return res.status(500).json({
      success: false,
      message: "Não foi possível enviar sua solicitação.",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});