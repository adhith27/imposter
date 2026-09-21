const express = require("express");
const crypto = require("crypto");

const app = express();

// Render provides PORT automatically.
// Locally, it will use port 3000.
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Get visitor IP while respecting common proxy setups.
function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return req.socket.remoteAddress || "Unknown";
}

// Tracking endpoint
app.get("/track", (req, res) => {
  const visit = {
    id: crypto.randomUUID(),
    time: new Date().toISOString(),

    ip: getClientIP(req),

    userAgent: req.get("user-agent") || "Unknown",

    referer: req.get("referer") || "Direct visit",
  };

  console.log("\n========== VISIT ==========");
  console.log("ID:", visit.id);
  console.log("Time:", visit.time);
  console.log("IP:", visit.ip);
  console.log("User-Agent:", visit.userAgent);
  console.log("Referer:", visit.referer);
  console.log("===========================\n");

  // Redirect to the educational page.
  res.redirect("/");
});

// Browser information
app.post("/browser-info", (req, res) => {
  const browserInfo = {
    time: new Date().toISOString(),
    screen: req.body.screen || "Unknown",
    language: req.body.language || "Unknown",
    platform: req.body.platform || "Unknown",
  };

  console.log("\n====== BROWSER INFO ======");
  console.log(browserInfo);
  console.log("==========================\n");

  res.json({
    success: true,
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Educational tracking lab is running",
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log("-----------------------------------");
  console.log("Educational Tracking Lab Started");
  console.log(`Port: ${PORT}`);
  console.log("-----------------------------------");
});
