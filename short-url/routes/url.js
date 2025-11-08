const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleRedirectUrl,
  handleAnalytics,
} = require("../controllers/url");
const router = express.Router();
router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleAnalytics);
module.exports = router;
