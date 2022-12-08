const router = require('express').Router();
const materialRouter = require('./MaterialRoutes');
const materialLevelsRouter = require('./MaterialLevelsRoutes');
const studentRouter = require('./StudentRoutes');
const teacherRouter = require('./TeacherRoutes');
const questionsRouter = require('./questions');
const files = require('./FirebaseRoutes');
const userRouter = require('./UserRouter');

router.use('/materials', materialRouter);
router.use('/materials-levels', materialLevelsRouter);
router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);
router.use('/questions', questionsRouter);
router.use('/files', files);
router.use('/me', userRouter);

module.exports = router;
