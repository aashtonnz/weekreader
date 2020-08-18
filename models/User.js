const mongoose = require("mongoose");
const config = require("config");
const maxArticles = config.get("maxArticles");

const DEFAULT_UPDATE_DAYS = [0, 1, 2, 3, 4, 5, 6]; // Every day

const article = {
  title: { type: String, required: true },
  link: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
  bookmarked: { type: Boolean },
  hidden: { type: Boolean },
  archived: { type: Boolean },
  pending: { type: Boolean },
};

const subscription = {
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channel",
    required: true,
  },
  isSubscribed: { type: Boolean, default: true },
  rssUrl: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  maxArticles: { type: Number, default: maxArticles },
  inboxCollapsed: { type: Boolean },
  bookmarkedCollapsed: { type: Boolean },
  hiddenCollapsed: { type: Boolean },
  imgKey: { type: String },
  articles: [article],
  description: { type: String },
  descriptionsHidden: { type: Boolean },
};

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articlesUpdateHour: { type: Number, required: true },
  hourOffset: { type: Number, required: true },
  articlesUpdateDays: { type: [Number], default: DEFAULT_UPDATE_DAYS },
  articlesUpdatedAt: { type: Date },
  prevArticlesUpdatedAt: { type: Date },
  subscriptions: [subscription],
  confirmed: { type: Boolean },
  mailSubscribed: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", UserSchema);
