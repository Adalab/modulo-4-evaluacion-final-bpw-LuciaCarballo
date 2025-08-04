const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("Usuario de la base de datos:", process.env.DB_USER);

const server = express();

server.use(cors());
server.use(express.json()); 


const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`🟢 Server escuchando en: http://localhost:${port}`);
});


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


server.get('/allfrases', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM frases');
    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows
    });
  } catch (error) {
    console.error('Error al obtener las frases:', error);
    res.status(500).json({ error: 'Error al obtener las frases' });
  }
});


server.get('/frases', async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.execute(`
     SELECT 
        frases.frases_id,
        frases.texto,
        frases.marca_tiempo,
        frases.descripcion,
        capitulos.titulo AS titulo_capitulo,
        GROUP_CONCAT(personajes.nombre SEPARATOR ', ') AS personajes
      FROM frases
      JOIN capitulos ON frases.capitulos_id = capitulos.capitulos_id
      JOIN capitulos_has_personajes ON capitulos.capitulos_id = capitulos_has_personajes.capitulos_id
      JOIN personajes ON capitulos_has_personajes.personajes_id = personajes.personajes_id
      GROUP BY frases.frases_id
    `);

    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows
    });
  } catch (error) {
    console.error('Error al obtener frases con detalles:', error);
    res.status(500).json({ error: 'Error al obtener frases con detalles' });
  }
});


server.post('/frases', async (req, res) => {
  try {
    const { texto, marca_tiempo, descripcion, capitulos_id } = req.body;

    console.log('REQ BODY:', req.body); 

    if (!texto || !capitulos_id) {
      return res.status(400).json({
        success: false,
        error: 'Los campos "texto" y "capitulos_id" son obligatorios'
      });
    }

    const connection = await getConnection();

    const [result] = await connection.execute(
      'INSERT INTO frases (texto, marca_tiempo, descripcion, capitulos_id) VALUES (?, ?, ?, ?)',
      [texto, marca_tiempo || null, descripcion || null, capitulos_id]
    );

    await connection.end();

    res.status(201).json({
      success: true,
      mensaje: 'Frase insertada correctamente',
      frases_id: result.insertId
    });

  } catch (error) {
    console.error('Error al insertar frase:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});


server.get('/frases/:id', async (req, res) => {
  try {
    const fraseId = req.params.id;

    const connection = await getConnection();

    const [rows] = await connection.execute(`
      SELECT 
        frases.frases_id,
        frases.texto,
        frases.marca_tiempo,
        frases.descripcion,
        capitulos.titulo AS titulo_capitulo,
        GROUP_CONCAT(personajes.nombre SEPARATOR ', ') AS personajes
      FROM frases
      JOIN capitulos ON frases.capitulos_id = capitulos.capitulos_id
      JOIN capitulos_has_personajes ON capitulos.capitulos_id = capitulos_has_personajes.capitulos_id
      JOIN personajes ON capitulos_has_personajes.personajes_id = personajes.personajes_id
      WHERE frases.frases_id = ?
      GROUP BY frases.frases_id
    `, [fraseId]);

    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Frase no encontrada' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener frase por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


server.put('/frases/:id', async (req, res) => {
  try {
    const fraseId = req.params.id;
    const { texto, marca_tiempo, descripcion, capitulos_id } = req.body;

    if (!texto || !capitulos_id) {
      return res.status(400).json({
        success: false,
        error: 'Los campos "texto" y "capitulos_id" son obligatorios'
      });
    }

    const connection = await getConnection();

    const [result] = await connection.execute(
      `UPDATE frases
       SET texto = ?, marca_tiempo = ?, descripcion = ?, capitulos_id = ?
       WHERE frases_id = ?`,
      [texto, marca_tiempo || null, descripcion || null, capitulos_id, fraseId]
    );

    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Frase no encontrada' });
    }

    res.json({
      success: true,
      mensaje: 'Frase actualizada correctamente'
    });

  } catch (error) {
    console.error('Error al actualizar frase:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});



server.delete('/frases/:id', async (req, res) => {
  try {
    const fraseId = req.params.id;

    const connection = await getConnection();

    const [result] = await connection.execute(
      'DELETE FROM frases WHERE frases_id = ?',
      [fraseId]
    );

    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Frase no encontrada'
      });
    }

    res.json({
      success: true,
      mensaje: `Frase con ID ${fraseId} eliminada correctamente`
    });

  } catch (error) {
    console.error('Error al eliminar frase:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});


server.get('/personajes', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM personajes');
    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows
    });
  } catch (error) {
    console.error('Error al obtener personajes:', error);
    res.status(500).json({ error: 'Error al obtener personajes' });
  }
});


server.get('/capitulos', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM capitulos');
    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows
    });
  } catch (error) {
    console.error('Error al obtener capítulos:', error);
    res.status(500).json({ error: 'Error al obtener capítulos' });
  }
});


server.get('/frases/personaje/:personaje_id', async (req, res) => {
  try {
    const personajeId = req.params.personaje_id;

    const connection = await getConnection();

    const [rows] = await connection.execute(`
      SELECT 
        frases.frases_id,
        frases.texto,
        frases.marca_tiempo,
        frases.descripcion,
        capitulos.titulo AS titulo_capitulo,
        GROUP_CONCAT(personajes.nombre SEPARATOR ', ') AS personajes
      FROM frases
      JOIN capitulos ON frases.capitulos_id = capitulos.capitulos_id
      JOIN capitulos_has_personajes ON capitulos.capitulos_id = capitulos_has_personajes.capitulos_id
      JOIN personajes ON capitulos_has_personajes.personajes_id = personajes.personajes_id
      WHERE personajes.personajes_id = ?
      GROUP BY frases.frases_id
    `, [personajeId]);

    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows
    });
  } catch (error) {
    console.error('Error al obtener frases por personaje:', error);
    res.status(500).json({ error: 'Error al obtener frases por personaje' });
  }
});


server.get('/frases/capitulo/:capitulo_id', async (req, res) => {
  try {
    const capituloId = req.params.capitulo_id;

    const connection = await getConnection();

    const [rows] = await connection.execute(`
      SELECT 
        frases.frases_id,
        frases.texto,
        frases.marca_tiempo,
        frases.descripcion,
        capitulos.titulo AS titulo_capitulo,
        GROUP_CONCAT(personajes.nombre SEPARATOR ', ') AS personajes
      FROM frases
      JOIN capitulos ON frases.capitulos_id = capitulos.capitulos_id
      JOIN capitulos_has_personajes ON capitulos.capitulos_id = capitulos_has_personajes.capitulos_id
      JOIN personajes ON capitulos_has_personajes.personajes_id = personajes.personajes_id
      WHERE capitulos.capitulos_id = ?
      GROUP BY frases.frases_id
    `, [capituloId]);

    await connection.end();

    res.json({
      info: { count: rows.length },
      results: rows
    });
  } catch (error) {
    console.error('Error al obtener frases por capítulo:', error);
    res.status(500).json({ error: 'Error al obtener frases por capítulo' });
  }
});

