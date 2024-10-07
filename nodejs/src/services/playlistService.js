//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
const { PutObjectCommand} = require('@aws-sdk/client-s3'); 
//const {RegistrarUsuario} = require("../models/registrarUsuarioModel")
const {uploadImage} = require("../models/s3Model")
const {connection} = require('../../config/database')
const {s3} = require('../../config/awsS3')


/************************************************************************************
 * 
 * 
 *   OPERACIONES PLAYLIST
 * 
 * 
 ************************************************************************************/
// Implementación de servicios para registrar usuario
exports.crearPlaylistService = async function(crearPlaylist){
    //implementar la conexion con el bucker s3 y la db
    //variables
const {name,description,id_user } = crearPlaylist.body;
let photo_url = `https://soundstreamresources.s3.amazonaws.com/images/${crearPlaylist.file.originalname}`;

//implementado s3

const subirImagen = new uploadImage(crearPlaylist.file);
const command = new PutObjectCommand(subirImagen);

await s3.send(command)
     .then(response => {
          sqlComand = `INSERT INTO playlists(name, description, photo_url, id_user) VALUES ("${name}","${description}","${photo_url}", ${id_user});`
          //console.log(sqlComand);
          return new Promise(function(resolve,reject){
               connection.query(sqlComand, 
                    (error, results) => {
                         if(error){
                         reject({error: new Error(`Error al crear playlist,datos en incorrectos. Error Sql:${error.sqlMessage}`)});
                         }
                         // Obtener el último ID insertado
                         const lastInsertId = results.insertId;
                         sqlComand2 = `SELECT p.id_playlist, p.name, p.description, p.photo_url, p.id_user FROM playlists p WHERE p.id_playlist = ${lastInsertId};`
                         connection.query(sqlComand2, 
                              (error, results) => {
                              if(error){
                                   reject({error: new Error(`Error al crear playlist,datos en incorrectos. Error Sql:${error.sqlMessage}`)});
                              }
                              
                                   resolve(results[0]);
                              });

                    });
     
          });

      }).catch((error) =>{
          reject({message:"Error al subir imagen en s3 :("});
     });

}

exports.modificarPlaylistService = async function(modificarPlaylist){
     //por implementar s3 y db
     //variables
     const {name,description,id_playlist } = modificarPlaylist.body;
     let photo_url = `https://soundstreamresources.s3.amazonaws.com/images/${modificarPlaylist.file.originalname}`;

     //implementado s3

     const subirImagen = new uploadImage(modifcarPlaylist.file);
     const command = new PutObjectCommand(subirImagen);

     await s3.send(command)
     .then(response => { 

          sqlComand = `UPDATE playlists SET name = "${name}", description = "${description}", photo_url = "${photo_url}" WHERE id_playlist = ${id_playlist};`
          return new Promise(function(resolve,reject){
               connection.query(sqlComand, 
                    (error, results) => {
                    if(error){
                         reject({message: new Error(`Error al modificar playlist. Error Sql:${error.sqlMessage}`)});
                    }
                         
                         resolve({message: "Playlist modificado correctamente!!!"});
                    });

          
          });

     }).catch((error) =>{
          reject({message:"Error al subir imagen en s3 :("});
     });

}


exports.obtenerPlaylistService = function(obtenerPlaylist){
     //por implementar s3 y db

     sqlComand = `SELECT p.id_playlist, p.name, p.description, p.photo_url, u.id_user FROM playlists p 
                    INNER JOIN users u ON p.id_user  = u.id_user WHERE u.id_user  = ${obtenerPlaylist.id_user};`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({error: new Error(`Error al obtener lista de canciones de playlist. Error Sql:${error.sqlMessage}`)});
                   }
                   let data = results;

                   if(data === undefined){
                    resolve({message: `Error, No existe este playlist con usuario id: ${obtenerPlaylist.id_user}`});
                   }else{
                    resolve(data); 
                   }
                         
                                  
               });

         
     });
}


exports.obtenerCancionPlaylistService =  function(obtenerPlaylist){
     //por implementar
     
     sqlComand = `SELECT s.id_song, s.name,s.artist, s.duration, s.file_url, s.photo_url, sp.is_favorite FROM songs s 
                    INNER JOIN song_playlist sp ON s.id_song  = sp.id_song 
                    INNER JOIN playlists p ON sp.id_playlist  = p.id_playlist WHERE p.id_playlist  = ${obtenerPlaylist.id_playlist};`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                         return reject({error: new Error(`Error al obtener lista de canciones de playlist. Error Sql:${error.sqlMessage}`)});
                   }
                   let data = results;
                  
                   
                   if(data === undefined ){
                         return resolve({message: `Error, Este playlist no posee canciones`});
                   }else{          
                         return resolve(data); 
                         console.log("Aqui aspo en else")
                   }

                                
               });
          console.log("Aqui paso al final ajaj xD");

         
     });
}

exports.obtenerInformacionPlaylistService = function(obtenerInformacionPlaylist){
     //por implementar
     

     sqlComand = `SELECT p.id_playlist, p.name, p.description, p.photo_url, p.id_user FROM playlists p WHERE p.id_playlist = ${obtenerInformacionPlaylist.id_playlist};`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({message: new Error(`Error al obtener informacion de playlist. Error Sql:${error.sqlMessage}`)});
                   }
                   let data = results;

                   if(data === undefined){
                    return resolve({message: `Error, No existe este playlist  para obtener las canciones`});
                   }else{
                         return resolve(data[0]); 
                   }
                         
                                 
               });

         
     });
}

exports.obtenerCancionFavoritaPlaylistService = function(obtenerCancionFavoritaPlaylist){
     //por implementar
     

     sqlComand = `SELECT p.id_playlist, p.name, p.description, p.photo_url, p.id_user FROM playlists p WHERE p.id_user =  ${obtenerCancionFavoritaPlaylist.id_user};`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({message: new Error(`Error al obtener lista favorita de canciones. Error Sql:${error.sqlMessage}`)});
                   }
                   let data = results;

                   if(data === undefined){
                    resolve({message: `Error, No existe ningun playlist favorita`});
                   }else{
                    resolve(data[0]);  
                   }
                         
                                 
               });

         
     });
}


exports.eliminarPlaylistService = function(eliminarPlaylist){
     //por implementar
     sqlComand = `DELETE FROM playlists WHERE id_playlist =  "${eliminarPlaylist.id_playlist}";`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({message: new Error(`Error al eliminar playlist. Error Sql:${error.sqlMessage}`)});
                   }
                   //console.log(results.affectedRows);
                   let data = results;

                   if(data.affectedRows === 0){
                    resolve({message: `Error, No existe este playlist id: ${eliminarPlaylist.id_playlist} para eliminarlo`});
                   }else{
                    resolve(data);    
                   }
                         
                               
               });

         
     });
     
}


exports.agregarCancionPlaylistService = function(agregarCancionPlaylist){
     //por implementar
    //agregar cacnion a favorito
     sqlComand = `INSERT INTO song_playlist (is_favorite,id_song,id_playlist) VALUES (${agregarCancionPlaylist.is_favorite},${agregarCancionPlaylist.id_song},${agregarCancionPlaylist.id_playlist});`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({message: new Error(`Error al agregar cancion al playlist. Error Sql:${error.sqlMessage}`)});
                   }
               
                   let data = results;

                   if(data.affectedRows === 0){
                    resolve({error:`Error, No existe este playlist  para agregar cancion`});
                   }
                    //aqui modificar aqui
                    
                    resolve({
                         message:"Playlist-song relation creates",
                         id:data.insertId
                    });               
               });

         
     });
     
}

exports.eliminarCancionPlaylistService = function(eliminarCancionPlaylist){
     //por implementar
     sqlComand = `DELETE FROM song_playlist WHERE id_song=  ${eliminarCancionPlaylist.id_song} and id_playlist=  ${eliminarCancionPlaylist.id_playlist};`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({message: new Error(`Error al eliminar cancion en  playlist. Error Sql:${error.sqlMessage}`)});
                   }
                   //console.log(results.affectedRows);
                   let data = results;

                   if(data.affectedRows === 0){
                    resolve({error:`Error, No existe esta cancion id: ${eliminarPlaylist.id_song_playlist} para eliminar en playlist`});
                   }
                         
                    resolve({menssage:"Song removed from playlist"});               
               });

         
     });
     
}


exports.holaPlaylistService = function(){ 
     return new Promise(function(resolve,reject){
          resolve("Hola Mundo!!!!!");
         
     });
     
}
     
     