const subscriptionService = require('../services/SubscriptionService');
const SubscriptionModel = require('../models/Subscription');

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
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
      res.json('subscripted');
    } else {
      const subscription = await subscriptionService.createSubscription(req.body);
      const teacherAndStudent = await subscriptionService.findByID(
        req.body.teacher._id,
        req.body.student._id,
      );
      if (!teacherAndStudent) {
        throw new Error('Teacher or Student was not found!');
      } else {
        res.json(subscription);
      }
    }
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
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.deleteSubscription(req.params.id);
    res.json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
