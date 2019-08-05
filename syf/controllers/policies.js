const Policy = require("../models/Policies/Policies");

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

// Añadir archivos a la póliza
exports.addFile = (req, res) => {
 res.status(200).json({
   file: req.file
 })
};

// Consultar archivos de la póliza
exports.getFiles = (req, res) => {

};