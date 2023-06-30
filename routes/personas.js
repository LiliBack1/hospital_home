var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

/* Seleccionar personas*/
router.get('/', function (req, res) {
  connection.query('SELECT * FROM personas', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('personas', {personas: results, opcion: 'disabled', estado: true});
    }
  });
});


// Agregar personas

router.get('/agregar-persona', (req, res) => {
  res.sendFile('registro-personas.html', { root: 'public' });
})

router.post('/agregar', (req, res) => {
  const cedula = req.body.cedula;
  const nombres = req.body.nombre;
  const apellidos = req.body.apellido;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  connection.query(`INSERT INTO personas (id, nombres, apellidos, edad, telefono) VALUES (${cedula},'${nombres}', '${apellidos}', ${edad}, '${telefono}')`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/personas');
    }
  });
})

// Actualizar personas

router.get('/activar', function (req, res) {
  connection.query('SELECT * FROM personas', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('personas', { personas: results, opcion: ''});
    }
  });
});

router.post('/actualizar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  const nombre = req.body.persona;
  const apellido = req.body.apellido;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  connection.query(`UPDATE personas SET nombres='${nombre}', apellidos='${apellido}', edad=${edad}, telefono=${telefono} WHERE id=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/personas');
    }
  });
})

// Eliminar personas

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  connection.query(`DELETE FROM personas WHERE id=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/personas');
    }
  });
})


module.exports = router;