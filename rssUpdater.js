require("dotenv").config();
const moment = require("moment");
const { isUpdateTime } = require("./utils");
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
    if (moment().utc().hour() === 0) {
      const timeB = moment();
      await mockUserService.updateArticles();
      console.log(
        `Mock user articles updated - ${moment().diff(timeB, "seconds")}s`
      );
    }
    const timeC = moment();
    await userService.updateArticles();
    console.log(`User articles updated - ${moment().diff(timeC, "seconds")}s`);

    const timeD = moment();
    const users = await userService.find();
    await Promise.all(
      users
        .filter(
          (user) =>
            isUpdateTime(user.articlesUpdateHour, user.articlesUpdateDays) &&
            user.mailSubscribed &&
            user.confirmed
        )
        .map(async (user) => {
          try {
            const unsubToken = await tokenService.create(user.email);
            await mailService.sendInbox(user, unsubToken);
          } catch (error) {
            console.error("Error sending email:", error);
          }
        })
    );
    console.log(`Emails sent - ${moment().diff(timeD, "seconds")}s`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
