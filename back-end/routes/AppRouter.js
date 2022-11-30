const router = require('express').Router();
const materialRouter = require('./MaterialRoutes');
const materialLevelsRouter = require('./MaterialLevelsRoutes');
const questionRouter = require('./questions');

router.use('/materials', materialRouter);
router.use('/materials-levels', materialLevelsRouter);
router.use('/questions', questionRouter);

module.exports = router;
