const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
app.disable("x-powered-by");
app.use(morgan("combined"));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/vendor", express.static(path.join(__dirname, "vendor")));
app.use("/icons", express.static(path.join(__dirname, "icons")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/html", express.static(path.join(__dirname, "html")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/appcache", express.static(path.join(__dirname, "appcache")));
const clientStats = require("./stats.json");
const outputPath = __dirname;
app.get("/service-worker.js", (req, res) => {
    res.sendFile("./service-worker.js", {root: "./"});
});
app.get("/sw.js", (req, res) => {
    res.sendFile("./sw.js", {root: "./"});
});
app.get("/index.html", (req, res) => {
    res.sendFile("./index.html", {root: "./html"});
});
app.use(require("./server/main").default({ production: true, clientStats , outputPath}));
app.listen(5000);
