//Imports
const router = require('express').Router();
const apiRoutes = require('./api');

//Route section that creates => localhost:3001/api
router.use('/api', apiRoutes);
router.use((req, res) => {
    return res.send('Wrong route!');
})

//export
module.exports = router;