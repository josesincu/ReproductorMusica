const express = require('express');
const router = express.Router();
const multer = require('multer');
// Configurar multer para manejar datos de formulario


// Configurar Multer para almacenar archivos en memoria (puedes cambiarlo según tus necesidades)
//const storage = multer.memoryStorage();

//const upload = multer();


//const usuarioController = require('../controllers/usuarioController');
const {crearCancionController,modificarCancionController,verCancionesController,verCancionController,eliminarCancionController} = require('../controllers/cancionController');


const storage = multer.memoryStorage();  // Puedes usar diskStorage si prefieres guardar en disco
const upload = multer({ storage: storage });

// Rutas para usuarios
//router.get('/', holaUsuarioController);
router.post('/create_song', upload.any(), crearCancionController);
router.put('/update_song', modificarCancionController);
router.get('/get_songs',verCancionesController);
router.get('/get_song',verCancionController);
router.delete('/delete_song',eliminarCancionController);

module.exports = router;