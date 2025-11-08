const { nanoid } = require("nanoid");
const URL = require("../models/url");
const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitedHistory: [],
  });
  return res.json({ id: shortId });
};
const handleRedirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitedHistory: { timestamps: Date.now() } } }
    );
    if (!entry) return res.status(404).send("Short URL not found 😕");
    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error while redirecting:", error);
    res.status(500).send("Internal Server Error");
  }
};
const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    TotalClicks: result.visitedHistory.length,
    Analytics: result.visitedHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectUrl,
  handleAnalytics,
};
