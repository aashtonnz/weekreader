const mongoose = require("mongoose");

const article = {
  title: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String },
  publishedAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
};

const Channel = new mongoose.Schema({
  rssUrl: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  numSubscribers: { type: Number, default: 0 },
  imgKey: { type: String },
  description: { type: String },
  articles: [article],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("channel", Channel);
