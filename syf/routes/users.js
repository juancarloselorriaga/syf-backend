const express   = require('express');
const router    = express.Router();

const usersController = require('../controllers/users')

// Crea un nuevo empleado y ¿lo asigna a un usuario padre?
router.post('/add-employee', usersController.addEmployee)

// Crear un nuevo usuario
router.post('/add-user', usersController.addUser)

// Buscar un usuario por mail => ..users/search?email=doe@gmail.com
router.get('/search', usersController.searchUserBy)

// Consulta un usuario por _id de Mongo
router.get('/:id', usersController.getOneUser)

// Editar un usuario por _id de Mongo
router.put('/:id', usersController.editUser)

// Eliminar un usuario por _id de Mongo
router.delete('/:id', usersController.deleteUser)

// Consultar todos los usuarios disponibles
router.get('/', usersController.getAllUsers)

module.exports = router;