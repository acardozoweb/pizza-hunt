const router = require('express').Router();
//importing API routes
const apiRoutes = require('./api');
const htmlRoutes = require('./html/html-routes');

// add prefixes of '/api' to all api routes imported from api folder
router.use('/api', apiRoutes);

router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
