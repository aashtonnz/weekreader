const mailgun = require("mailgun-js");
const html = require("./html");

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

const unsubscribe = async (address) => {
  await new Promise((res, rej) =>
    mail.post(`/${domain}/unsubscribes`, { address, tag: "*" }, (error) => {
      if (error) {
        rej(error);
      }
      res();
    })
  );
};

const resubscribe = async (address) => {
  await new Promise((res, rej) =>
    mail.delete(`/${domain}/unsubscribes`, { address, tag: "*" }, (error) => {
      if (error) {
        rej(error);
      }
      res();
    })
  );
};

const isSubscribed = async (address) => {
  if (!address) {
    return false;
  }
  const result = await new Promise((res) =>
    mail.get(`/${domain}/unsubscribes/${address}`, {}, (error, _response) => {
      if (error) {
        res(true);
      }
      res(false);
    })
  );
  return result;
};

const sendInbox = async (user) => {
  await send("Inbox", html.inbox(user.subscriptions), user.email);
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
  unsubscribe,
  resubscribe,
  isSubscribed,
};
