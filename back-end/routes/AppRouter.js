const router = require('express').Router();
const materialRouter = require('./MaterialRoutes');
const materialLevelsRouter = require('./MaterialLevelsRoutes');
const studentRouter = require('./StudentRoutes');
const teacherRouter = require('./TeacherRoutes');
const questionsRouter = require('./questions');

router.use('/materials', materialRouter);
router.use('/materials-levels', materialLevelsRouter);
router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);
router.use('/questions', questionsRouter);

module.exports = router;
