const mongoose = require("mongoose");
const config = require("config");
const maxArticles = config.get("maxArticles");

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
  maxArticles: { type: Number, default: maxArticles },
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
