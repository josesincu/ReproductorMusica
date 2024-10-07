const {crearPlaylistService, modificarPlaylistService, obtenerPlaylistService, obtenerCancionPlaylistService, obtenerCancionFavoritaPlaylistService, obtenerInformacionPlaylistService, eliminarPlaylistService, agregarCancionPlaylistService, eliminarCancionPlaylistService, holaPlaylistService} = require('../services/playlistService');

/************************************************************************************
 * 
 * 
 *   OPERACIONES PLAYLIST
 * 
 * 
 ************************************************************************************/

exports.crearPlaylistController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    
    crearPlaylistService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Se ha creado playlist exitosamente!!!","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al generar playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )

};

exports.obtenerPlaylistController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerPlaylistService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Lista de playlist obtenida exitosamente","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener todas las playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.obtenerCancionPlaylistController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerCancionPlaylistService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Canciones obtenido exitosamente","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener canciones de playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.obtenerCancionFavoritaPlaylistController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerCancionFavoritaPlaylistService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Canciones obtenido exitosamente","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener canciones de playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};


exports.obtenerInformacionPlaylistController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerInformacionPlaylistService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Lista de playlist obtenida exitosamente","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener todas las playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.modificarPlaylistController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    modificarPlaylistService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Playlist modificado exitosamente!!","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al modificar playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.eliminarPlaylistController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    eliminarPlaylistService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Playlist eliminado exitosamente","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al eliminar playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};

exports.agregarCancionPlaylistController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    agregarCancionPlaylistService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Cancion agregado a playlist exitosamente","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error al agregar cancion en  playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};


exports.eliminarCancionPlaylistController = async (req, res) => {
    // Implementación para eliminar cancion en el playlist
    eliminarCancionPlaylistService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Cancion eliminado exitosamente de playlist","datosPlaylist":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error al eliminar cancion de playlist!!!","errorPlaylist":err.message});
            return   res.json(err.message);
        }
    )
};






/***************************************************************************************************** */
// Controladores para hola mundo
exports.holaPlaylistController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaPlaylistService().then((result)=>{
        return res.status(200).json({status:200,mensaje:"Hola playlist correctamente",datosPlaylist:result})    
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:"Error al obtener hola playlist",errorPlaylist:error.message})
    })  
};

