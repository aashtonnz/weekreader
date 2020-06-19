const mongoose = require("mongoose");
const userService = require("./user");
const channelService = require("./channel");

const mongoUri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    await channelService.seed();
    await userService.seed();
    console.log("Database seeded");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  connect,
  seed,
};
