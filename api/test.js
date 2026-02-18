module.exports = async function handler(req, res) {
  return res.status(200).json({ 
    message: "¡Función serverless funcionando!",
    method: req.method,
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
};
