const express = require("express");
const auth = require("../../middleware/auth");
const userService = require("../../services/user");
const tokenService = require("../../services/token");
const { errorMsg, successMsg } = require("../../utils");
const {
  checkSignup,
  checkLogin,
  checkUserEdit,
} = require("../../utils/validation");

const router = express.Router();

// @route  GET api/users/me
// @desc   Load user
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await userService.findById(req.user.id);
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/users
// @desc   Sign up user and get token
// @access Public
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const invalidMsg = checkSignup(username, email, password);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const usernameTaken = await userService.exists({ username });
    if (usernameTaken) {
      return res.status(400).json(errorMsg("Username already taken"));
    }
    const user = await userService.create(username, email, password);
    const token = await tokenService.create(user._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/users/login
// @desc   Login in and get token
// @access Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const invalidMsg = checkLogin(username, password);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await userService.validate(username, password);
    if (!user) {
      return res.status(400).json(errorMsg("Invalid credentials"));
    }
    const token = await tokenService.create(user.id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/users
// @desc   Update user
// @access Private
router.put("/", auth, async (req, res) => {
  const {
    email,
    password,
    articleUpdateDays,
    articleUpdateHour,
    mailSubscribed,
  } = req.body;
  const invalidMsg = checkUserEdit(
    email,
    password,
    articleUpdateDays,
    articleUpdateHour
  );
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await userService.update(
      req.user.id,
      email,
      password,
      articleUpdateDays,
      articleUpdateHour,
      mailSubscribed
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  DELETE api/users
// @desc   Delete user
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    const user = await userService.remove(req.user.id);
    if (!user) {
      res.status(500).json(errorMsg("User not found"));
    }
    res.status(200).json(successMsg(`User ${user._id} deleted`));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
