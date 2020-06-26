const express = require("express");
const userService = require("../../services/user");
const { errorMsg, successMsg } = require("../../utils");

const router = express.Router();

// @route  POST api/confirm/:user_id/:confirm_id
// @desc   Authenticate email
// @access Public
router.post("/confirm/:user_id/:confirm_id", async (req, res) => {
  const { user_id: userId, confirm_id: confirmId } = req.params;
  try {
    const user = await userService.confirmEmail(userId, confirmId);
    if (!user) {
      return res.json(errorMsg("Invalid ID"));
    }
    res.json(successMsg("Email confirmed"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
