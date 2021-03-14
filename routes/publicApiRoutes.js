const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");

// @route   GET /all
// @desc    Get the data of all the events
// @access  Public
router.get(
  "/",
  createProxyMiddleware({
    target:
      "https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }",
    changeOrigin: true,
  })
);

module.exports = router;
