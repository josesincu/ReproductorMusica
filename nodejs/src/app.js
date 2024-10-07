
const dotenv = require("dotenv");
dotenv.config({path: '../.env'});

require('dotenv').config();

const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
//INSERT INTO songs (id_song,name, photo_url, duration, artist, file_url) VALUES (11,"juan","ddj/daf/",'00:11:12',"pedro","df/ddf/ds");
//Importacion de modulos de rutas
const usuarioRoute = require('./routes/usuarioRoute');
const playlistRoute = require('./routes/playlistRoute');
const cancionRoute = require('./routes/cancionRoute');

// Middleware para manejar datos JSON
app.use(express.json());
 
// Use CORS middleware
 app.use(cors());

// Rutas de usuario
app.use('/', usuarioRoute);
app.use('/', playlistRoute);
app.use('/',cancionRoute);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
