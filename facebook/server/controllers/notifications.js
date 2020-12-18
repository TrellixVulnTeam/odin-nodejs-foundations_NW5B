const Notification = require("../models/notifications");

exports.get_notification = (req, res, next) => {
  Notification.find({ to: req.user._id })
    .sort("-createdAt")
    .populate("to")
    .populate("from")
    .exec((err, notifications) => {
      if (err) return res.status(400).json(err);
      res.json(notifications);
    });
};

exports.delete_notification = (req, res, next) => {
  Notification.findOneAndDelete(
    { _id: req.params.notification_id },
    (err, notification) => {
      if (err) return res.status(400).json(err);
      res.json(notification);
    }
  );
};

exports.read_notification = (req, res, next) => {
  Notification.findOneAndUpdate(
    { _id: req.params.notification_id },
    { clicked: true },
    (err, notification) => {
      if (err) return res.status(400).json(err);
      res.json(notification);
    }
  );
};
