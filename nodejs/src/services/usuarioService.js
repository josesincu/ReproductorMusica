
const { PutObjectCommand} = require('@aws-sdk/client-s3'); 
//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
const {uploadImage} = require("../models/s3Model")
const {connection} = require('../../config/database')
const {s3} = require('../../config/awsS3')
const {EncriptarPass,CompararPass} = require('../models/encriptar')
/************************************************************************************
 * 
 * 
 *   OPERACIONES USUARIO
 * 
 * 
 ************************************************************************************/
// Implementación de servicios para registrar usuario
exports.registrarUsuarioService = async function(registrarUsuario){
    //implementar la conexion con el bucker s3 y la db
    
    //variables
    const {name,last_name, email, password, date_of_birth, role } = registrarUsuario.body;
    nuevoPassword = '';
    EncriptarPass(password).then(result=>{
          nuevoPassword = result;
    }).catch(error=>{
          console.log(error);
    });
    let photo_url = `https://soundstreamresources.s3.amazonaws.com/images/${registrarUsuario.file.originalname}`;
    
    
    //implementado s3
    
    const subirImagen = new uploadImage(registrarUsuario.file);
    const command = new PutObjectCommand(subirImagen);

    await s3.send(command)
     .then(response => {
          
          sqlComand = `INSERT INTO users(name, last_name, photo_url, email, password, date_of_birth, role) VALUES ("${name}","${last_name}","${photo_url}","${email}","${nuevoPassword}","${date_of_birth}","${role}");`
          //console.log(sqlComand);
          return new Promise(function(resolve,reject){
               connection.query(sqlComand, 
                    (error, results) => {
                         if(error){
                              reject({message:new Error(`Error al crear usuario y playlist,datos en incorrectos. Error Sql:${error.sqlMessage}`)});
                         }
                         const lastInsertId = results.insertId;
                         sqlComand2 = `INSERT INTO playlists(name,description, photo_url,id_user) VALUES ("favorites-${lastInsertId}","Mis Favoritos","https://picsum.photos/1920/1080",${lastInsertId});`
                         connection.query(sqlComand2, 
                              (error, results) => {
                                   if(error){
                                        reject({message:new Error(`Error al crear playlist favorito. Error Sql:${error.sqlMessage}`)});
                                   }
                                        
                                   resolve({message:"Usuario y playlist creado con exito"});
                              });
                         
                         //resolve({message:"Usuario y playlist creado con exito"});
                    });
     
          });


     }).catch((error) =>{
          reject({message:"Error al subir imagen en s3 :("});
     });

}

exports.modificarUsuarioService = async function(modificarUsuario){
     //variables
     const {name,last_name,email, id_user} = modificarUsuario.body;
     let photo_url = `https://soundstreamresources.s3.amazonaws.com/images/${modificarUsuario.file.originalname}`;
    
     //implementado s3
     
     const subirImagen = new uploadImage(modificarUsuario.file);
     const command = new PutObjectCommand(subirImagen);
     //await s3.send(command);

     await s3.send(command)
     .then(response => {
       //return res.status(200).json({urlImagen: urlImagen, mensaje: "archivo subido correctamente"});
       //implementando db
          sqlComand = `UPDATE users SET name = "${name}", last_name = "${last_name}", photo_url = "${photo_url}", email = "${email}" WHERE id_user = ${id_user};`
          return new Promise(function(resolve,reject){
               
               connection.query(sqlComand, 
                    (error, results) => {
                    if(error){
                         reject({message:new Error(`Error al modificar usuario. Error Sql:${error.sqlMessage}`)});
                    }
                         
                         resolve({message:"Usuario modificado con exito!!"});
                    });

          
          });
     })
     .catch((error) =>{
          reject({message:"Error al subir imagen en s3 :("});
     });
     
     
}

exports.obtenerUsuarioService = function(obtenerUsuario){
     //por implementar
     //console.log(obtenerUsuario);
     sqlComand = `SELECT u.name, u.last_name, u.photo_url, u.email, u.date_of_birth FROM users u WHERE u.id_user =  "${obtenerUsuario.id_user}";`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({message: new Error(`Error al obtener usuario. Error Sql:${error.sqlMessage}`)});
                   }
                   let data = results;

                   if(data === undefined){
                    resolve({message:`Error, No existe este usuario ${obtenerUsuario.id_user}`});
                   }else{
                    resolve(data[0]); 
                   }
                         
                                  
               });

         
     });
}


exports.eliminarUsuarioService = function(eliminarUsuario){
     //por implementar
     sqlComand = `DELETE FROM users WHERE id_user =  "${eliminarUsuario.id_user}";`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({message:new Error(`Error al obtener usuario. Error Sql:${error.sqlMessage}`)});
                   }
                   //console.log(results.affectedRows);
                   let data = results;

                   if(data.affectedRows === 0){
                    resolve({message:`Error, No existe este usuario ${eliminarUsuario.id_user} para eliminarlo`});
                   }
                         
                    resolve(data);               
               });

         
     });
     
}

 
exports.loginUsuarioService = function(loginUsuario){
     //recuperar lapass
     passEncriptado = ''
     sqlComandPass = `SELECT u.password FROM users u WHERE u.email =  "${loginUsuario.email}";`
     //por implementar
     
     return new Promise(function(resolve,reject){
          connection.query(sqlComandPass, 
               (error, results) => {
                   if(error){
                    reject({message: new Error(`Error al obtener password. Error Sql:${error.sqlMessage}`)});
                   }
                   let data = results[0];
     
                    if(data === undefined){
                         reject({message:`Error, No existe este password con correo:${loginUsuario.email}`});
                    }else{
                         passEncriptado = data.password;
                         CompararPass(loginUsuario.password,data.password).then(result=>{
                              passCorrecto = result;
                              
                              if(passCorrecto === false){
                                   console.log("Aqui es falso dice jaja")
                                   return {message: "Error, contrasena incorrecta"};
                              }
                              
                              sqlComand = `SELECT u.id_user,u.role FROM users u WHERE u.email =  "${loginUsuario.email}" and u.password = "${passEncriptado}";`
                              connection.query(sqlComand, 
                                   (error, results) => {
                                       if(error){
                                        reject({message: new Error(`Error al obtener usuario. Error Sql:${error.sqlMessage}`)});
                                       }
                                       let data = results;
                                       
                                       
                                        if(data === undefined){
                                             reject({message:`Error, No existe este usuario con correo:${loginUsuario.email}`});
                                        }else{
                                             resolve(data[0]);
                                        }
                                             
                                                       
                                   });
                              
                         }).catch(error=>{
     
                         });
     
                         //resolve(data[0]);
                    }
                         
                                   
               });
          

         
     });
}


exports.holaUsuarioService = function(){ 
     return new Promise(function(resolve,reject){
          resolve("Hola Mundo!!!!!");
         
     });
     
}
     
     