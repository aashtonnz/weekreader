require("dotenv").config();
const moment = require("moment");
const dbService = require("./services/db");
const channelService = require("./services/channel");
const userService = require("./services/user");
const mockUserService = require("./services/mockUser");
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
    await mockUserService.updateArticles();
    console.log(
      `Mock user articles updated - ${moment().diff(timeB, "seconds")}s`
    );
    const timeC = moment();
    await userService.updateArticles();
    console.log(`User articles updated - ${moment().diff(timeC, "seconds")}s`);

    const timeD = moment();
    const users = await userService.find();
    for (user of users) {
      try {
        if (
          user.articlesUpdateHour === moment().utc().hour() &&
          user.articlesUpdateDays.includes(moment().utc().day()) &&
          user.mailSubscribed &&
          user.confirmed
        ) {
          const unsubToken = await tokenService.create(user.email);
          await mailService.sendInbox(user, unsubToken);
        }
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
    console.log(`Emails sent - ${moment().diff(timeD, "seconds")}s`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
