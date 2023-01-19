const subscriptionService = require('../services/SubscriptionService');
const studentService = require('../services/StudentService');
const teacherService = require('../services/TeacherService');
const SubscriptionModel = require('../models/Subscription');
const sendMail = require('../services/nodemailer');
const { SUBSCRIPTION } = require('../constants/emailSend');
const { socket } = require('../listeners/Socket');

exports.getAllSubscriptions = async (req, res) => {
  try {
    const { statusName, id } = req.query;
    const subscriptions = statusName
      ? await subscriptionService.getSubscriptionsByStatus(statusName, id)
      : await subscriptionService.getAllSubscriptions();
    res.json(subscriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTeacherSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getTeacherSubscriptions(req.params.id);
    res.json(subscriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStudentSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getStudentSubscriptions(req.params.id);
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
