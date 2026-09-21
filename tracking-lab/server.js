const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

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

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Educational Tracking Lab</title>
        </head>
        <body>
            <h1>Educational Tracking Lab</h1>

            <p>Visit recorded for this educational demonstration.</p>

            <p><strong>Visit ID:</strong> ${visit.id}</p>
            <p><strong>Time:</strong> ${visit.time}</p>
            <p><strong>Browser:</strong> ${visit.userAgent}</p>

            <p>
                No password, cookie, GPS location, camera,
                microphone, or personal files are collected.
            </p>
        </body>
        </html>
    `);
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
