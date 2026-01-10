const Notification = require("../models/Notification");

const createNotification = async ({ userId, title, message, type }) => {
  await Notification.create({
    user: userId,
    title,
    message,
    type,
  });
};

module.exports = createNotification;
