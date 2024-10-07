const express = require('express');
const router = express.Router();


const multer = require('multer');

// Configura multer
const storage = multer.memoryStorage();  // Puedes usar diskStorage si prefieres guardar en disco
const upload = multer({ storage: storage });

//Importacionde los modulos de playlistController
const {
    crearPlaylistController,
    obtenerPlaylistController,
    obtenerCancionPlaylistController,
    obtenerCancionFavoritaPlaylistController,
    modificarPlaylistController,
    eliminarPlaylistController,
    agregarCancionPlaylistController,
    eliminarCancionPlaylistController,
    obtenerInformacionPlaylistController,
    holaPlaylistController
} = require('../controllers/playlistController');

// Rutas para playlist
router.post('/playlist_song', agregarCancionPlaylistController); // agregar una cancion a una playlist
router.post('/get_songsPlaylist',obtenerCancionPlaylistController);//obtener todas las canciones relacionados con una playlist usando id_playlist
router.delete('/delete_playlist_song', eliminarCancionPlaylistController); // borrar una cancion de una playlist
router.post('/get_playlists_u',obtenerPlaylistController);//obtener todas las playlist relacionadas con el usuario
router.post('/create_playlist',upload.single('photo'), crearPlaylistController); // creams el playlist
router.post('/get_playlist',obtenerInformacionPlaylistController);//obtener informacion de una playlist usando id_playlist
router.delete('/delete_playlist', eliminarPlaylistController); //borrar una playlist
router.post('/get_playlist_favorite',obtenerCancionFavoritaPlaylistController); // obtiene todas las canciones favoritas


router.put('/update_playlist', upload.single('photo'),modificarPlaylistController); // modificar los datos de una playlist




router.get('/hola_playlist',holaPlaylistController); //test prueba


module.exports = router;
