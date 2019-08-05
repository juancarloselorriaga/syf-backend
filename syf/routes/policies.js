const express   = require('express');
const router    = express.Router();
const multer    = require('multer')

const fileFilter = function(req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];

  if(!allowedTypes.includes(file.mimetype)){
    const error = new Error('Tipo de archivo no permitido');
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
}

const MAX_SIZE = 2000000;
const upload = multer({
  dest: './uploads/',
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
})

const policyController = require('../controllers/policies')

// Eliminar una póliza por _id de Mongo
router.delete('/:id', policyController.deletePolicy)

// Editar una póliza por _id de Mongo
router.put('/:id', policyController.editPolicy)

// Añadir archivos a la póliza
router.post('/:id/add-file', upload.single('file'), policyController.addFile)

// Ver archivos de la póliza
router.get('/:id/files', policyController.getFiles)



module.exports = router;