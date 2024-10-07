const express = require('express');
const router = express.Router();

const multer = require('multer');

// Configura multer
const storage = multer.memoryStorage();  // Puedes usar diskStorage si prefieres guardar en disco
const upload = multer({ storage: storage });
//Eportacion de modulos Usuarios
const {
    holaUsuarioController,
    registrarUsuarioController, 
    obtenerUsuarioController, 
    modificarUsuarioController, 
    eliminarUsuarioController,
    loginUsuarioController} = require('../controllers/usuarioController');

// Rutas para usuarios
router.get('/get_user',obtenerUsuarioController); //para obtener los datos del  usuario
router.post('/login', loginUsuarioController); // login
router.post('/create_user', upload.single('photo'), registrarUsuarioController);// para crear un usuario


router.put('/update_user', upload.single('photo'),modificarUsuarioController); // modificar uno de los usuarios
router.delete('/delete_user', eliminarUsuarioController); //borrar uno de los usaruios

router.get('/hola_user', holaUsuarioController); //saludos usuarios


module.exports = router;
