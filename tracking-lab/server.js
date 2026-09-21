const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// This route MUST run first when /track is opened
app.get("/track", (req, res) => {
    const visit = {
        id: crypto.randomUUID(),
        time: new Date().toISOString(),
        ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown",
        userAgent: req.get("user-agent") || "Unknown",
        referer: req.get("referer") || "Direct"
    };

    console.log("\n========== TRACK VISIT ==========");
    console.log("ID:", visit.id);
    console.log("TIME:", visit.time);
    console.log("IP:", visit.ip);
    console.log("USER AGENT:", visit.userAgent);
    console.log("REFERER:", visit.referer);
    console.log("=================================\n");

    res.redirect("/");
});

app.post("/browser-info", (req, res) => {
    console.log("\n====== BROWSER INFO ======");

    console.log({
        time: new Date().toISOString(),
        screen: req.body.screen || "Unknown",
        language: req.body.language || "Unknown",
        platform: req.body.platform || "Unknown"
    });

    console.log("==========================\n");

    res.json({ success: true });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
