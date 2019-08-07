const Policy = require("../models/Policies/Policies");
const AWS    = require('aws-sdk');
const fs     = require('fs')
const sharp  = require('sharp')
const path   = require('path')

AWS.config.update({
  accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
  secretAccessKey: `${process.env.AWS_SECRET_KEY}`
})

// Eliminar una poliza de contacto por _id de Mongo => DELETE
exports.deletePolicy = (req, res) => {
  Policy.findOne({ _id: req.params.id }, (err, policy) => {
    if (err) {
      //Si no existe, manda error
      return res.status(500).json({
        text: "Imposible eliminar, póliza inexistente"
      });
    }
    if(policy){
      //Elimina la poliza
      policy.deletePolicyItem(req, res, policy)
    }
    else {
      return res.status(200).json({
        text: "Póliza chingao"
      });
    }
  })
};

// Editar una poliza de contacto por _id de Mongo => DELETE
exports.editPolicy = (req, res) => {
  Policy.findOne({ _id: req.params.id }, (err, policy) => {
    if (err) {
      //Si no existe, manda error
      return res.status(500).json({
        text: "Imposible editar, póliza inexistente"
      });
    }
    if(policy){
      //Edita la poliza
      Policy.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        (err, doc) => {
          if (err) {
            return res.status(500).json({
              text: "Error en el servidor",
              err: err
            });
          }
          res.status(200).json({
            text: "Póliza actualizada con éxito",
            data: req.body
          });
        }
      );
    }
    else {
      return res.status(200).json({
        text: "Póliza no encontrada"
      });
    }
  })
};

// Añadir un archivo a la póliza8
exports.addFile = (req, res) => {
 res.status(200).json({
   file: req.file
 })
};

// Añadir archivos a la póliza
exports.addFiles = (req, res) => {
  res.status(200).json({ files: req.files })
 };

 // Añadir archivos a la póliza y después subirlos a AWS
exports.addAndUploadFile = async (req, res) => {

  const s3 = new AWS.S3();
  const now = Date.now()

  try{
    const buffer = await sharp(req.file.path)
    .toBuffer()

    const s3res = await s3.upload({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${now}-${req.file.originalname}`,
      Body: buffer,
      ACL: 'public-read'
    }).promise();

    fs.unlink(req.file.path, () => {
      res.status(200).json({ file: s3res.Location })
    })
  } catch (err) {
    res.status(422).json({ err })
  }
 }

// Consultar archivos de la póliza
exports.getFiles = (req, res) => {

};