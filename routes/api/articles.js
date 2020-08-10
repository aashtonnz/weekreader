const express = require("express");
const auth = require("../../middleware/auth");
const articleService = require("../../services/article");
const { errorMsg } = require("../../utils");

const router = express.Router();

// @route  POST api/articles/:id/hidden
// @desc   Mark hidden
// @access Private
router.post("/:id/hidden", auth, async (req, res) => {
  const { id: articleId } = req.params;
  try {
    const user = await articleService.hidden(req.user.id, articleId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/articles/:id/unhidden
// @desc   Unmark hidden
// @access Private
router.post("/:id/unhidden", auth, async (req, res) => {
  const { id: articleId } = req.params;
  try {
    const user = await articleService.unhidden(req.user.id, articleId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/articles/:id/bookmarked
// @desc   Mark bookmarked
// @access Private
router.post("/:id/bookmarked", auth, async (req, res) => {
  const { id: articleId } = req.params;
  try {
    const user = await articleService.bookmarked(req.user.id, articleId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/articles/:id/unbookmark
// @desc   Unmark bookmarked
// @access Private
router.post("/:id/unbookmarked", auth, async (req, res) => {
  const { id: articleId } = req.params;
  try {
    const user = await articleService.unbookmarked(req.user.id, articleId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
