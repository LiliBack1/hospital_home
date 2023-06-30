const mysql = require('mysql')
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Education.8',
    database: 'hospital_home'
})

conexion.connect(function(error) {
    if(error){
        console.log('Ocurrio un error en la base de datos');
        return;
    } else{
        console.log('Conexion exitosa!')
    }

})

module.exports = {connection:conexion} 