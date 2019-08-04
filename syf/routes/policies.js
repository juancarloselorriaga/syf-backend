const express   = require('express');
const router    = express.Router();

const policyController = require('../controllers/policies')

// Eliminar una póliza por _id de Mongo
router.delete('/:id', policyController.deletePolicy)

// Editar una póliza por _id de Mongo
router.put('/:id', policyController.editPolicy)

module.exports = router;