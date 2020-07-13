require("dotenv").config();
const moment = require("moment");
const dbService = require("./services/db");
const channelService = require("./services/channel");
const userService = require("./services/user");
const mailService = require("./services/mail");
const tokenService = require("./services/token");

dbService.connect().then(async () => {
  try {
    const timeA = moment();
    await channelService.updateArticles();
    console.log(
      `Channel articles updated - ${moment().diff(timeA, "seconds")}s`
    );
    const timeB = moment();
    await userService.updateArticles();
    console.log(`User articles updated - ${moment().diff(timeB, "seconds")}s`);

    const timeC = moment();
    const users = await userService.find();
    for (user of users) {
      const articlesUpdated =
        user.articlesUpdatedAt &&
        moment().diff(user.articlesUpdatedAt, "minutes") < 30;
      try {
        if (articlesUpdated && user.mailSubscribed && user.confirmed) {
          const unsubToken = await tokenService.create(user.email);
          await mailService.sendInbox(user, unsubToken);
        }
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
    console.log(`Emails sent - ${moment().diff(timeC, "seconds")}s`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
