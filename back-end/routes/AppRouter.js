const router = require('express').Router();
const materialRouter = require('./MaterialRoutes');
const questionRouter = require('./questions');

router.use('/api/materials', materialRouter);
router.use('/api/questions', questionRouter);

module.exports = router;
