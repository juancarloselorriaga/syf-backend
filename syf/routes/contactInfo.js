const express   = require('express');
const router    = express.Router();

const contactInfoController = require('../controllers/contactInfo')

// Eliminar una tarjeta por _id de Mongo
router.delete('/:id', contactInfoController.deleteContactCard)

module.exports = router;