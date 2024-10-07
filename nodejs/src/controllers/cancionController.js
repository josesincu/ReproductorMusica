
const {crearCancionService,modificarCancionService,verCancionesService,verCancionService,eliminarCancionService} = require('../services/cancionService');
const multer = require('multer');
// Configuración de multer para manejar el form-data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
/************************************************************************************
 * 
 * 
 *   OPERACIONES USUARIO
 * 
 * 
 ************************************************************************************/

exports.crearCancionController = async (req, res) => {
   
    // Implementación para registrar una nueva cancion
    crearCancionService(req)
    
    .then((result)=>{
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            return   res.json(result);
        }
    )

};

exports.modificarCancionController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    modificarCancionService(req.body)
    .then((result)=>{
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            return  res.json(err.message);
        }
    )
};

exports.verCancionesController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    verCancionesService(req.query)
    .then((result)=>{
        return  res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            return res.json(err.message);
        }
    );
};

exports.verCancionController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    verCancionService(req.body)
    .then((result)=>{
        return   res.json(result);
    }     
    )
    .catch(
        (err)=>{
            return   res.json(err.message);
        }
    )
};

exports.eliminarCancionController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    eliminarCancionService(req.body)
    .then((result)=>{
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            return   res.json(err.message);
        }
    )
};
