const router = require('express').Router();
const materialRouter = require('./MaterialRoutes');
const materialLevelsRouter = require('./MaterialLevelsRoutes');
const studentRouter = require('./StudentRoutes');
const teacherRouter = require('./TeacherRoutes');
const questionsRouter = require('./questions');
const userRouter = require('./UserRoutes');
const files = require('./FirebaseRoutes');
const subscriptionsRouter = require('./SubscriptionRoutes');

router.use('/materials', materialRouter);
router.use('/materials-levels', materialLevelsRouter);
router.use('/students', studentRouter);
router.use('/teachers', teacherRouter);
router.use('/questions', questionsRouter);
router.use('/users', userRouter);
router.use('/files', files);
router.use('/subscriptions', subscriptionsRouter);

module.exports = router;
