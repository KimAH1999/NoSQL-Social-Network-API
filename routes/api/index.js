//imports
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//router creater
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

//export 
module.exports = router;