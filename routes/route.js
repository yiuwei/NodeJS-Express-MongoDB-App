/* Users Route */

// Import module dependencies 
const controllers = require('../controllers/controller'); 
const express = require('express');
const multer = require('multer');
const router = express.Router();
const files = multer({storage: controllers.storage});
const ServiceClass = controllers.ServiceClass;

// List the reservations
router.get('/', (req, res, next) => {
    ServiceClass.list() 
      .then((cuisine)=>{
        res.render('reserve', {    
            cuisine: cuisine
        });
      })
      .catch((err)=>{
        if (err) {
            res.status(404);
            res.end();
        }
    });
});

// Create the reservations
router.post('/', files.single('imagefile'), (req, res, next)=>{
    const path = "/static/images/" + req.file.filename;
    const resto = {
        originalname: req.file.originalname,
        imageurl: path,
        name: req.body.name, 
        time: req.body.time,
        date: req.body.date,
        guest: req.body.guest,
    }
    ServiceClass.create(resto) 
      .then(()=>{
        res.redirect('/profile');
      })
      .catch((err)=>{
        if (err){
         throw new Error(err);
      }
    });
});

// Read the listed reservations
router.get('/:itemid', (req, res, next) => {
    ServiceClass.read(req.params.itemid)
        .then((data) => {
            res.render('update', {
                data: data
            });
        })
        .catch((err)=>{
          if (err) {
              res.status(404);
              res.end();
          }
    });
});

// Updated the resources by id
router.post('/:itemid', (req, res, next) => {
    if (req.body.action === 'update') {
        const itemid = req.params.itemid;
        const data = {
            name: req.body.name,
            time: req.body.time,
            date: req.body.date,
            guest: req.body.guest
        }
        ServiceClass.update(itemid, data)
            .then(() => {
                res.redirect('/profile');
            })
            .catch((err)=>{
                res.status(404);
                res.end();
        });
    // Delete the resource by id
    } else if (req.body.action === 'delete') {
        ServiceClass.delete(req.params.itemid)
            .then(() => {
                res.redirect('/profile');
            })
            .catch((err) => {
                res.status(404);
                res.end();
            });
    }
});
module.exports = router;
