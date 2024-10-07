const {registrarUsuarioService, obtenerUsuarioService, modificarUsuarioService, eliminarUsuarioService, holaUsuarioService, loginUsuarioService} = require('../services/usuarioService');
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

exports.registrarUsuarioController = async (req, res) => {
    // Implementación para registrar un nuevo usuario
    // Llamada de funcion registrarUsuarioService
    registrarUsuarioService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Se ha generado se ha registrado usuario exitosamente!!!","datosUsuario":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al generar registrar usuario!!!","errorUsuario":err.message});
            return   res.json(err.message);
        }
    )

};

exports.obtenerUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    obtenerUsuarioService(req.query)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Datos de usuario obtenido exitosamente","datosUsuario":result});
        return  res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener usuario!!!","errorUsuario":err.message});
            return res.json({"mensaje":err.message});
        }
    )
};

exports.modificarUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
   
    //******************** */
    modificarUsuarioService(req)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Usuario modificado exitosamente","datosUsuario":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al modificar usuario!!!","errorUsuario":err.message});
            return   res.json(err.message);
            
        }
    )
};

exports.eliminarUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    eliminarUsuarioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Usuario eliminado exitosamente","datosUsuario":result});
        return   res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al eliminar usuario!!!","errorUsuario":err.message});
            return   res.json(err.message);
        }
    )
};


exports.loginUsuarioController = async (req, res) => {
    // Implementación para obtener un usuario por ID
    loginUsuarioService(req.body)
    .then((result)=>{
        //return   res.status(200).json({"status":200,"mensaje":"Datos de usuario obtenido exitosamente","datosUsuario":result});
        return  res.json(result);
    }
        
    )
    .catch(
        (err)=>{
            //return   res.status(400).json({"status":400,"mensaje":"Error,al obtener usuario!!!","errorUsuario":err.message});
            return res.json({mensaje:err.message});
        }
    )
};



/***************************************************************************************************** */
// Controladores para hola mundo
exports.holaUsuarioController = async (req, res) => {
    // Implementación para obtener un hola mundo
    holaUsuarioService().then((result)=>{
        return res.json({mensaje:"Hola Usuario correctamente",datosUsuario:result})    
    })
    .catch((error)=>{
        return res.status(400).json({status:400,mensaje:"Error al obtener hola usuario",errorUsuario:error.message})
    })  
};

