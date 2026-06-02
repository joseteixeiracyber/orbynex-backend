import { sendToN8N } from "../services/n8nService.js";

export async function createContact(req, res) {
  try {
    const {
      name,
      email,
      phone,
      company,
      message,
      website
    } = req.body;

    if (website) {
      return res.status(400).json({
        success: false,
        message: "Bot detectado.",
      });
    }

    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios.",
      });
    }

    await sendToN8N({
      name,
      email,
      phone,
      company,
      message,

      source: "Site Orbynex",

      createdAt: new Date().toISOString(),

      ip:
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress,
    });

    return res.status(200).json({
      success: true,
      message:
        "Solicitação enviada com sucesso.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Erro ao processar solicitação.",
    });
  }
}