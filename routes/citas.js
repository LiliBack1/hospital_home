var express = require('express');
var router = express.Router();
const {connection} = require('../database/conexion.js')

/* Obtener citas medicas*/

router.get('/', function(req, res, next) {
  connection.query('SELECT c.id, c.fecha, pe.nombres persona, med.nombres medico, med.consultorio, c.id_persona, c.id_medico FROM cita_medica c, personas pe, medicos med WHERE pe.id=id_persona AND med.id=id_medico;', function(error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    }else{
    res.render('citas', { citas: results,  opcion: 'disabled', estado: true});
  
    }
  });
});

//Agregar citas medicas

router.get('/agregar-cita', (req, res) =>{
  res.sendFile('registro-citas.html', {root: 'public'});
})

router.post('/agregar', (req, res) =>{
  const cedula = req.body.cedula;
  const fecha = req.body.fecha;
  const especialidad = req.body.especialidad;
  console.log(especialidad);

  connection.query(`SELECT id FROM medicos WHERE especialidad='${especialidad}';`, function(error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    }
      const cedulaMedico = results[0].id;
      connection.query(`INSERT INTO cita_medica (id_persona, id_medico, fecha) VALUES (${cedula}, ${cedulaMedico}, '${fecha}')`, (error, result) => {
        if (error) {
          console.log("Ocurrio un error en la ejecución", error)
          res.status(500).send("Error en la consulta");
        }else{
          res.redirect('/citas');
        }
      });
  });
})
// actualizar mascota
router.get('/activar', function (req, res) {
  connection.query('SELECT c.id, c.fecha, pe.nombres persona, med.nombres medico, med.consultorio, c.id_persona, c.id_medico FROM cita_medica c, personas pe, medicos med WHERE pe.id=id_persona AND med.id=id_medico;', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      console.log(results)
      res.render('citas', { citas: results, opcion: ''});
    }
  });
});
router.post('/actualizar/:id_persona/:id_medico', (req, res) => {
  const medico = req.params.id_medico;
  const persona = req.params.id_persona;
  const fecha = req.body.fecha;
  
  connection.query(`UPDATE cita_medica SET fecha='${fecha}' WHERE id_medico='${medico}' and id_persona='${persona}'`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/citas');
    }
  });
})


//Eliminar cita medica

// Eliminar medicos
router.get('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM cita_medica WHERE id=${id}`, (error, resultado) => {
  if (error) {
  res.status(500).send('Ocurrio un error en la consulta ' + error)
  } else{
  res.status(200).redirect('/citas')
  }
  })
  })



module.exports = router;