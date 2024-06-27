/**
 * Restful API
 */

// Import module dependencies 
const controllers = require('../../controllers/controller');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const files = multer({storage: controllers.storage});
const ServiceClass = controllers.ServiceClass;

// Process CORS Headers
router.use((req, res, next)=>{
  res.set({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
    'Content-type':'application/json'
  });
  if (req.method == 'OPTIONS'){
      res.status(200);
      res.end();
  } else {
      next();
  }
});

// List the reservation
router.get('/', (req, res, next)=>{
   ServiceClass.list()
      .then((cuisine)=>{
        res.status(200);
        res.send(JSON.stringify(cuisine));
      }).catch((err)=>{
        res.status(404);
        res.end();
    });
});

// Create the reservation
router.post('/', files.single('imagefile'), async (req, res, next)=>{
  const path = "/static/images/" + req.file.filename;
  const resto = {
      originalname: req.file.originalname,
      imageurl: path,
      name: req.body.name, 
      time: req.body.time,
      date: req.body.date,
      guest: req.body.guest,
  }
  try{
    const data = await ServiceClass.create(resto);
    res.status(201);
    res.send(JSON.stringify(data));
  }catch(err){
    throw new Error(err);
  }
});

// Read the reservtaion listed
router.get('/:listid', (req, res, next)=>{
  ServiceClass.read(req.params.listid)
    .then((data)=>{
      res.status(200);
      res.send(JSON.stringify(data));
    }).catch((err)=>{
      res.status(404);
      res.end();
  });
});

// Update the reservation by id
router.put('/:listid', (req, res, next)=>{
  ServiceClass.update(req.params.listid, req.body)
    .then((updated)=>{
      res.status(200);
      res.send(JSON.stringify(updated));
    }).catch((err)=> {
      res.status(404);
      res.end();
    })
})

// Delete the reservation by id
router.delete('/:listid', (req, res, next) => {
  ServiceClass.delete(req.params.listid)
    .then((deleted) => {
      res.status(200);
      res.send(JSON.stringify(deleted));
    }).catch((err) => {
      res.status(404);
      res.end();
    });
});
module.exports = router;