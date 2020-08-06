require("dotenv").config();
const express = require("express");
const path = require("path");
const sslRedirect = require("heroku-ssl-redirect");
const fileUpload = require("express-fileupload");
const dbService = require("./services/db");
const mockUserService = require("./services/mockUser");
const channelService = require("./services/channel");

const port = process.env.PORT || 5000;
const nodeEnv = process.env.NODE_ENV;
const app = express();

dbService.connect().then(async () => {
  try {
    const hasChannels = await channelService.exists();
    if (!hasChannels) {
      await dbService.seed();
    }
    const hasMockUser = await mockUserService.find();
    if (!hasMockUser) {
      await mockUserService.create();
      console.log("Mock user created");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

app.use(express.json({ extended: false }));
app.use(sslRedirect());
app.use(fileUpload());
app.use("/api/config", require("./routes/api/config"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/subscriptions", require("./routes/api/subscriptions"));
app.use("/api/articles", require("./routes/api/articles"));

if (nodeEnv === "production") {
  app.use(express.static("./ui/build"));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "ui", "build", "index.html"));
  });
}
app.listen(port, () => console.log(`Server started on port ${port}`));
