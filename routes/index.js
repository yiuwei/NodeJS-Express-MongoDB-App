/**
 * Index Route
 */

// Import express modules 
const express = require('express');
const router = express.Router();

// Get HTTP request for view page
router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/menus', (req, res, next) => {
  res.render('menus');
});
  
router.get('/locations', (req, res, next) => {
  res.render('locations');
});

router.get('/specials', (req, res, next) => {
  // Create a list of cuisine
  const restaurant = [
    {
      name: "California Roll Sushi - 10 Pcs ",
      image: "static/images/photo1.jpg",
      special: "10 percent discount on all sushi roll products this weekend, conditions apply.",
      price: "Was $10.00, Now $9.00",
      description: "California Roll, filled with avocado and cucumber making it a tasty meal."
    },
    {
      name: "Hawaiian Veggie Pizza - 12 Slices",
      image: "static/images/photo4.jpg",
      special: "Fresh Made Veggie Pizza with new ingredients every Monday, conditions apply.  ",
      price: "Was $18.99, Now $15.99",
      description: "Hawaiian pizza with tomato sauces, fort cheeses, and cooked mushrooms." 
    },
  ];
  res.render('specials', { restaurant });
});
module.exports = router;