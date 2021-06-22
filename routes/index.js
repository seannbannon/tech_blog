const router = require('express').Router();
const apiRoutes = require('./api');
const homeroutes = require('./homeroutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeroutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;