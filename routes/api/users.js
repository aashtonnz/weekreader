const express = require("express");
const config = require("config");
const auth = require("../../middleware/auth");
const userService = require("../../services/user");
const tokenService = require("../../services/token");
const mailService = require("../../services/mail");
const { errorMsg, successMsg } = require("../../utils");
const {
  checkSignup,
  checkLogin,
  checkEmail,
  checkPassword,
  checkSettings,
} = require("../../utils/validation");

const userTimeoutHours = config.get("userTimeoutHours");
const passwordResetTimeoutMins = config.get("passwordResetTimeoutMins");
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
  const { email, password, hourOffset } = req.body;
  const invalidMsg = checkSignup(email, password, hourOffset);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const emailTaken = await userService.exists({ email });
    if (emailTaken) {
      return res.status(400).json(errorMsg("Email already taken"));
    }
    const user = await userService.create(email, password, hourOffset);
    const userToken = await tokenService.create(
      user._id,
      userTimeoutHours * 3600
    );
    const emailToken = await tokenService.create(email);
    await mailService.sendConfirm(email, emailToken);
    res.json({ token: userToken });
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/users/login
// @desc   Login in and get token
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const invalidMsg = checkLogin(email, password);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await userService.validate(email, password);
    if (!user) {
      return res.status(400).json(errorMsg("Invalid credentials"));
    }
    const token = await tokenService.create(
      user._id.toString(),
      userTimeoutHours * 3600
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/users/email
// @desc   Update email
// @access Private
router.put("/email", auth, async (req, res) => {
  const { email } = req.body;
  const invalidMsg = checkEmail(email);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const emailTaken = await userService.findOne({ email });
    if (emailTaken) {
      return res.status(400).json(errorMsg("Email already taken"));
    }
    const user = await userService.updateEmail(req.user.id, email);
    const token = await tokenService.create(email);
    await mailService.sendConfirm(email, token);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/users/password
// @desc   Update password
// @access Private
router.put("/password", auth, async (req, res) => {
  const { password } = req.body;
  const invalidMsg = checkPassword(password);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await userService.updatePassword(req.user.id, password);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/users/settings
// @desc   Update settings
// @access Private
router.put("/settings", auth, async (req, res) => {
  const { articleUpdateDays, articleUpdateHour, mailSubscribed } = req.body;
  const invalidMsg = checkSettings(articleUpdateDays, articleUpdateHour);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await userService.updateSettings(
      req.user.id,
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

// @route  POST api/users/confirm
// @desc   Confirm email
// @access Public
router.post("/confirm", async (req, res) => {
  const { token } = req.body;
  let email = null;
  try {
    email = tokenService.decode(token);
  } catch {
    return res.status(400).json(errorMsg("Invalid token"));
  }
  try {
    await userService.confirm(email);
    res.json(successMsg("User confirmed"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/users/unsubscribe
// @desc   Unsubscribe email
// @access Public
router.post("/unsubscribe", async (req, res) => {
  const { token } = req.body;
  let email = null;
  try {
    email = tokenService.decode(token);
  } catch {
    return res.status(400).json(errorMsg("Invalid token"));
  }
  try {
    await userService.unsubscribe(email);
    res.json(successMsg("User unsubscribed"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/users/reset-password-email
// @desc   Send password reset email
// @access Public
router.post("/reset-password-email", async (req, res) => {
  const { email } = req.body;
  const invalidMsg = checkEmail(email);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await userService.findOne({ email });
    if (user) {
      const token = await tokenService.create(
        email,
        passwordResetTimeoutMins * 60
      );
      await mailService.sendPasswordReset(email, token);
    }
    res.json(successMsg("Password reset sent"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST /api/users/reset-password
// @desc   Reset password
// @access Public
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  const invalidMsg = checkPassword(password);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  let email = null;
  try {
    email = tokenService.decode(token);
  } catch {
    return res.status(400).json(errorMsg("Invalid token"));
  }
  try {
    await userService.resetPassword(email, password);
    res.json(successMsg("Password reset"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
