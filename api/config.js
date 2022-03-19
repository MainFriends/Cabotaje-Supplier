const mysql = require('mysql');
require('dotenv').config();


//establecer conexion a la base datos
const mysqlConnect = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DATABASE,
    multipleStatements: true
});

//Manejar la excepcion
mysqlConnect.connect(error => {
    if(error){
        console.log(error);
    }else{
        console.log('Conectado a la base de datos');
    }
});

module.exports = mysqlConnect;