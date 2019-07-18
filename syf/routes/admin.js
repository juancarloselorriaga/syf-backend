const express = require('express');

const router = express.Router();

//Query string
// .../admin?name=juan&age=60
router.get('/', (req, res, next) =>{
  if(req.query.name){
    res.send(`You have requested an admin ${req.query.name} ${req.query.age}`)
  }
  else{
    res.send('You have requested an admin')
  }
})

//.../admin/juan
router.get('/:name', (req, res, next) =>{
  res.send(`You have requested an admin ${req.params.name}`)
})

module.exports = router;