// pages/api/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Você é o suporte de uma loja de roupas que tem ajudar os clientes com suas duvidas.O nome da loja é tendencia modas e ela fica na santa maria. no atacado sai mai barato do que no varejo. Faça respostas curtas: ${message}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      
      res.status(200).json({ reply: text });
    } catch (error) {
      console.error('Error making request to Gemini API:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
