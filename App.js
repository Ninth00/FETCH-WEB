const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto por tu usuario de MySQL
  password: 'n0m3l0', // Cambia esto por tu contraseña de MySQL
  database: 'tareas_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});


app.use(express.static('public'));

// Rutas

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  db.query('SELECT * FROM tareas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear una nueva tarea
app.post('/tareas', (req, res) => {
  const nuevaTarea = { titulo: req.body.titulo };
  db.query('INSERT INTO tareas SET ?', nuevaTarea, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...nuevaTarea });
  });
});

// Actualizar una tarea
app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  db.query('UPDATE tareas SET titulo = ? WHERE id = ?', [titulo, id], (err) => {
    if (err) throw err;
    res.json({ id, titulo });
  });
});

// Eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tareas WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
