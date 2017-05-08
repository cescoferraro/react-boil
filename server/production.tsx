const express = require('express');
const morgan = require('morgan');
const app = express();
app.disable('x-powered-by');
app.use(morgan("combined"));
app.use(express.static("dist"));
app.use(require("./server.tsx").default({ title: "Production", production: true }));
app.listen(4000);
