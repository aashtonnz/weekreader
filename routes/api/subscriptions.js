const express = require("express");
const auth = require("../../middleware/auth");
const channelService = require("../../services/channel");
const mockUserService = require("../../services/mockUser");
const subscriptionService = require("../../services/subscription");
const { errorMsg } = require("../../utils");
const {
  checkUrl,
  checkIndex,
  checkImg,
  checkTitle,
  checkFilter,
} = require("../../utils/validation");

const router = express.Router();

// @route  POST api/subscriptions/
// @desc   Subscribe
// @access Private
router.post("/", auth, async (req, res) => {
  const { rssUrl } = req.body;
  const invalidMsg = checkUrl(rssUrl);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  let channel = null;
  try {
    channel = await channelService.findOne({ rssUrl });
    if (!channel) {
      channel = await channelService.create(rssUrl);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(errorMsg("Error parsing RSS"));
  }
  try {
    const user = await subscriptionService.subscribe(req.user.id, channel);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  GET api/subscriptions/defaults
// @desc   Get default subscriptions
// @access Public
router.get("/defaults", async (_req, res) => {
  try {
    const mockUser = await mockUserService.find();
    res.json(mockUser.subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/subscriptions/:id/collapse
// @desc   Collapse articles
// @access Private
router.post("/:id/collapse", auth, async (req, res) => {
  const { id: subId } = req.params;
  const { filter } = req.body;
  const invalidMsg = checkFilter(filter);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await subscriptionService.collapse(req.user.id, subId, filter);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/subscriptions/:id/expand
// @desc   Expand articles
// @access Private
router.post("/:id/expand", auth, async (req, res) => {
  const { id: subId } = req.params;
  const { filter } = req.body;
  const invalidMsg = checkFilter(filter);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await subscriptionService.expand(req.user.id, subId, filter);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/subscriptions/move
// @desc   Move
// @access Private
router.post("/move", auth, async (req, res) => {
  const { oldIndex, newIndex } = req.body;
  const invalidMsg = checkIndex(oldIndex) || checkIndex(newIndex);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await subscriptionService.move(
      req.user.id,
      Number(oldIndex),
      Number(newIndex)
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/subscriptions/:id/img
// @desc   Edit image
// @access Private
router.put("/:id/img", auth, async (req, res) => {
  const { id: subId } = req.params;
  const { img } = req.files;
  const invalidMsg = checkImg(img);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await subscriptionService.editImg(req.user.id, subId, img);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/subscriptions/:id
// @desc   Edit title
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { id: subId } = req.params;
  const { title, descriptionsHidden } = req.body;
  const invalidMsg = checkTitle(title);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await subscriptionService.edit(
      req.user.id,
      subId,
      title,
      descriptionsHidden
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/subscriptions/:id/unsubscribe
// @desc   Unsubscribe
// @access Private
router.post("/:id/unsubscribe", auth, async (req, res) => {
  const { id: subId } = req.params;
  try {
    const user = await subscriptionService.unsubscribe(req.user.id, subId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
