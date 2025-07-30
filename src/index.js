const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

// Crear el servidor
const server = express();

// Permitir CORS
server.use(cors());

// Configurar el puerto
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server listening at: http://localhost:${port}`);
});

// Middleware para JSON
server.use(express.json());

// Conexión con la DB --> asíncrona
const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
  return connection;
};

// ENDPOINT para obtener frases
server.get("/frases", async (req, res) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM frases");
    await conn.end();
    res.json(result);
  } catch (error) {
    console.error("Error al obtener frases:", error);
    res.status(500).json({ error: "Error al obtener frases" });
  }
});
