const UserModel = require('../models/User');

// Consultar todos los usuarios disponibles
exports.getAllUsers = (req, res) => {

  UserModel.find({})
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json(err)
  })
};

// Consulta un usuario por _id de Mongo
exports.getOneUser = (req, res) => {

  UserModel.findById({
    _id: req.params.id
  })
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({
      text: "Error en el servidor",
      error: err
    })
  })
};

// Crear un nuevo usuario
exports.addUser = (req, res) => {
  
  if(!req.body) {
    return res.status(400).send('Request body is missing');
  }

  let model = UserModel(req.body)
  model.save()
  .then(doc => {
    if(!doc || doc.length === 0) {
      return res.status(500).send(doc)
    }

    res.status(200).send(doc)
  })
  .catch(err => {
    res.status(500).json({
      text: "Error en el servidor",
      error: err
    })
  })
};

// Editar un usuario por _id de Mongo
exports.editUser = (req, res) => {

  let username  = req.body.username
  let password  = req.body.password
  let name      = req.body.name
  let lastName  = req.body.lastName
  let email     = req.body.email
  let update    = {username, password, name, lastName, email}

  UserModel.findOneAndUpdate({_id: req.params.id}, {$set: update}, (err, doc) => {
    if(err){
      res.status(500).json({
        text: 'Error en el servidor',
        err: err
      })
    }
    res.status(200).json({
      text: 'Usuario actualizado con éxito',
      usuario: update
    })
  })
};

// Eliminar un usuario por _id de Mongo
exports.deleteUser = (req, res) => {

  UserModel.findByIdAndRemove({
    _id: req.params.id
  })
  .then(user => {
    res.status(200).json({
      text: 'Usuario eliminado con éxito',
      usuario: user
    })
  })
  .catch(err => {
    res.status(500).json({
      text: "Error en el servidor",
      error: err
    })
  })
}

// Buscar un usuario por mail => ..users/search?email=doe@gmail.com
exports.searchUserBy = (req, res) => {

  if(!req.query.email){  //Se toma al email como parámetro para buscar
    return res.status(400).send('Missing URL parameter: email')
  }

  UserModel.findOne({
    email: req.query.email
  })
  .then(doc => {
    res.status(200).json(doc)
  })
  .catch(err => {
    res.status(500).json({
      text: "Error en el servidor",
      error: err
    })
  })
};



