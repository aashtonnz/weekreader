const mongoose = require("mongoose");
const config = require("config");
const maxDailyArticles = config.get("maxDailyArticles");

const article = {
  title: { type: String, required: true },
  link: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
};

const subscription = {
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channel",
    required: true,
  },
  isSubscribed: { type: Boolean, default: true },
  maxDailyArticles: { type: Number, default: maxDailyArticles },
  rssUrl: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  imgKey: { type: String },
  articles: [article],
  description: { type: String },
  descriptionsHidden: { type: Boolean },
};

const MockUserSchema = new mongoose.Schema({
  subscriptions: [subscription],
});

module.exports = mongoose.model("mockUser", MockUserSchema);
