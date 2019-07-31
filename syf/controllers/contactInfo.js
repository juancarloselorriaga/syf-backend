const ContactInfo = require("../models/Setup/ContactInfo");

// Eliminar una tarjeta de contacto por _id de Mongo => DELETE
exports.deleteContactCard = (req, res) => {
  ContactInfo.findOne({ _id: req.params.id }, (err, contactInfo) => {
    if (err) {
      //Si no existe, manda error
      res.status(500).json({
        text: "Imposible eliminar, tarjeta inexistente"
      });
    }
    if(contactInfo){
      //Elimina la tarjeta
      contactInfo.deleteCard(req, res, contactInfo)
    }
  })
};