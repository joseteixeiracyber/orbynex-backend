import axios from "axios";

export async function sendToN8N(data) {
  return axios.post(
    process.env.N8N_WEBHOOK_URL,
    data
  );
}