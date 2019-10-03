const express = require("express");
const router = express.Router();

// @route /api/profile/test
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile works!"
  })
);

// @route /api/profile/getProfile

// @route /api/profile/editProfile

module.exports = router;
