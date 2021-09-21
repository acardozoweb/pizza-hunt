const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');


// add prefixes "/comments" to routes created in comment-routes
router.use('/comments', commentRoutes)

// add prefixes of '/pizzas' to routes created in pizza-routes.js
router.use('/pizzas', pizzaRoutes);




module.exports = router;