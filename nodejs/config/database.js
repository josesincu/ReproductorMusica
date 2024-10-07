/* dotenv nos permite leer las variables de entorno de nuestro .env */
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const mysql = require('mysql2'); // libreria conexion a db

let connection;

try {
    
    connection = mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "dark",
        database: process.env.DB_NAME || "practica1"
    });
    //console.log("conecto a bd");
    
} catch (error) {
    console.log("Error al conectar con la base de datos");
}




/*
try {
    
    connection = mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "dark",
        database: process.env.DB_NAME || "practica1"
    });
    
} catch (error) {
    console.log("Error al conectar con la base de datos");
}
console.log(process.env.PORT);
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
console.log(process.env.DB_NAME)
*/

module.exports = {connection};