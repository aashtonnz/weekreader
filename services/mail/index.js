const mailgun = require("mailgun-js");
const html = require("./html");
const moment = require("moment");

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mail = mailgun({ apiKey, domain });
const mailAddress = `new@${domain}`;

const send = async (subject, html, address) => {
  const data = {
    from: `Weekreader <${mailAddress}>`,
    to: address,
    subject,
    html,
  };
  const result = await new Promise((res, rej) =>
    mail.messages().send(data, (error, body) => {
      if (error) {
        rej(error);
      }
      res(body);
    })
  );
  return result;
};

const sendInbox = async (user, unsubToken) => {
  await send(
    `Inbox – ${moment(user.articlesUpdatedAt)
      .utc()
      .add(user.hourOffset, "hour")
      .format("MMMM D")}`,
    html.inbox(user.subscriptions, user.prevArticlesUpdatedAt, unsubToken),
    user.email
  );
};

const sendConfirm = async (email, token) => {
  await send("Confirm", html.confirm(token), email);
};

const sendPasswordReset = async (email, token) => {
  await send("Password Reset", html.passwordReset(token), email);
};

module.exports = {
  send,
  sendInbox,
  sendConfirm,
  sendPasswordReset,
};
