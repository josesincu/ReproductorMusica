const {connection} = require('../../config/database');

const {PutObjectCommand} = require('@aws-sdk/client-s3'); 
const {uploadImage,uploadMusic} = require("../models/s3Model");
const {s3} = require('../../config/awsS3');


/************************************************************************************
 * 
 * 
 *   OPERACIONES CANCIONES
 * 
 * 
 ************************************************************************************/
// Implementación de servicios para registrar canciones

exports.crearCancionService =  async function(registrarCancion){

          //obteniendo las variables del body
          const {name, duration, artist} = registrarCancion.body;

          // obteniendo los objetos archivos del input
          const photoFile =  registrarCancion.files[0];
          const fileFile =   registrarCancion.files[1];

          //generando el objeto imagen para s3
          const subirImagen = new uploadImage(photoFile);
          const command1 = new PutObjectCommand(subirImagen);
          
          //generando el objeto cancion para s3
          const subirCancion = new uploadMusic(fileFile);
          const command2 = new PutObjectCommand(subirCancion);
         
          //url generados para las canciones
          let photo_url = `https://soundstreamresources.s3.amazonaws.com/images/${photoFile.originalname}`;
          let music_url = `https://soundstreamresources.s3.amazonaws.com/music/${fileFile.originalname}`;
          
          try {
               await s3.send(command2)
          } catch (error) {
               return {mensaje:`Error al subir musica en s3 error es ${error}` }
          }

          try {
               await s3.send(command1)
          } catch (error) {
               return {mensaje:`Error al subir musica en s3 error es ${error}` }
          }
         
          
       var sqlComand = `INSERT INTO songs (name, photo_url, duration, artist, file_url) VALUES ("${name}","${photo_url}","${duration}","${artist}","${music_url}");`;
       
       return new Promise(function(resolve,reject){
                connection.query(sqlComand, 
                     (error, results) => {
                         let data = results[0];
                         console.log(data);
                         if(error){
                          reject({error:new Error(`Error al registrar cancnion,datos en incorrectos. Error Sql:${error.sqlMessage}`)});
                         }
                         
                          resolve(data);
                     });
      
       });
   
   }



exports.modificarCancionService = function(modificarCancion){

     //por implementar
     sqlComand = `UPDATE songs SET name = "${modificarCancion.name}", duration = "${modificarCancion.duration}", artist = "${modificarCancion.artist}"  WHERE id_song = "${modificarCancion.id_song}";`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                    if(error){
                    reject(new Error(`Error al modificar  cancion. Error Sql:${error.sqlMessage}`));
                    }
                    
                    let data = results;

                    if(data.affectedRows === 0){
                    resolve(`Error, No existe esta cancion ${modificarCancion.id_song} para modificar`);
                    }
                         
                    resolve(modificarCancion);               
               });
     
     });
     


}

exports.verCancionesService = function(obtenerCanciones){
  slqComando = `SELECT id_song, name, photo_url, duration, artist, file_url FROM songs`;
  return new Promise(function(resolve,reject){
    connection.query("SELECT id_song,name,photo_url,duration,artist,file_url FROM songs", 
         (error, results) => {

             if(error){
              reject(new Error(`Error al obtener usuario. Error Sql:${error.sqlMessage}`));
             }
             let data = results;
             //console.log("data: "+data);

             if(data === undefined){
              resolve({error:`Error, No existe esta cancion`});
             }
                   
              resolve(data);               
         });

    });

}


exports.verCancionService = function(obtenerCancion){
  var sqlComand = `select * from songs WHERE name = ${obtenerCancion.name};`;

  return new Promise(function(resolve,reject){
    
    connection.query(sqlComand, 
         (error, results) => {
             if(error){
              reject(new Error(`Error al obtener usuario. Error Sql:${error.sqlMessage}`));
             }
             let data = results;

             if(data.length === 0){
              resolve(`Error, No existe este  ${obtenerCancion.name}`);
             }
                   
              resolve(data);               
         });

    });

}

exports.eliminarCancionService = function(eliminarCancion){

     //por implementar
     sqlComand = `DELETE FROM songs WHERE id_song = ${eliminarCancion.id_song};`
     return new Promise(function(resolve,reject){
          connection.query(sqlComand, 
               (error, results) => {
                   if(error){
                    reject({error: new Error(`Error al borrar usuario. Error Sql:${error.sqlMessage}`)});
                   }
                   let data = results;

                   if(data  === undefined){
                    resolve({error:`Error, No existe esta cancion  para eliminarlo`});
                   }
                         
                    resolve({message:"Song deleted"});               
               });
     
     });


}
