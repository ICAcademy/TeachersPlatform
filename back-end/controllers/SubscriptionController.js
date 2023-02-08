// Model
const SubscriptionModel = require.main.require('./models/Subscription');

// Services
const sendMail = require.main.require('./services/nodemailer');
const subscriptionService = require.main.require('./services/SubscriptionService');
const studentService = require.main.require('./services/StudentService');
const teacherService = require.main.require('./services/TeacherService');

// Web sockets
const { socket } = require.main.require('./listeners/Socket');

// Constants
const { SUBSCRIPTION } = require.main.require('./constants/emailSend');
const { TEACHER } = require.main.require('./constants/UserRoles');

const getSubscriptionByRole = async (role, id) => {
  if (role === TEACHER) return await subscriptionService.getTeacherSubscriptions(id);
  return await subscriptionService.getStudentSubscriptions(id);
};

exports.getSubscriptionsByQueries = async (req, res) => {
  try {
    const { statusName, role, id } = req.query;
    const subscriptions =
      statusName && id
        ? await subscriptionService.getSubscriptionsCountByStatus(statusName, id)
        : await getSubscriptionByRole(role, id);
    res.json(subscriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserSubscriptionsByStatus = async (req, res) => {
  try {
    const { statusName, id } = req.query;

    const subscriptions = await subscriptionService.getSubscriptionsByStatus(statusName, id);

    res.json(subscriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const isSubscripted = await SubscriptionModel.findOne({
      teacherID: req.body.teacher._id,
      studentID: req.body.student._id,
    });
    if (isSubscripted) {
      return res.status(400).json({ message: 'Failed to subscribe! Check your subscriptions!' });
    }
    const student = await studentService.getStudentById(req.body.student._id);
    const teacher = await teacherService.getTeacherById(req.body.teacher._id);
    if (student && teacher) {
      const subscription = await subscriptionService.createSubscription(req.body);
      socket('create_subscription', req.body);
      await sendMail(req.body.email, req.body.fullName, SUBSCRIPTION, req.body.teacherName);
      return res.status(200).json(subscription);
    }
    throw new Error('Teacher or Student was not found!');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(req.params.id);
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.updateSubscription(req.params.id, req.body);
    const data = {
      id: req.params.id,
      body: req.body,
    };
    socket('update_subscription', data);
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.deleteSubscription(req.params.id);
    socket('delete_subscription', req.params.id);
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
