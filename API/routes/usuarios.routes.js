const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosControllers');

router.get('/usuarios', usuariosController.getUsuarios);

router.get('/usuarios/:id', usuariosController.getUsuariosById);

router.post('/usuarios/crear', usuariosController.crearUsuario);

router.delete('/usuarios/eliminar/:id', usuariosController.eliminarUsuario);

router.put('/usuarios/actualizar', usuariosController.actualizarUsuario);

module.exports = router;