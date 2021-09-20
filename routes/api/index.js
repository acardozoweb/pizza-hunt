const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// add prefixes of '/pizzas' rto routes creates in pizza-routes.js
router.use('/pizzas', pizzaRoutes);



module.exports = router;