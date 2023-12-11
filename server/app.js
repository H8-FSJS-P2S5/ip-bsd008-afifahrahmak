const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routers/index");
const ErrorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(ErrorHandler.handle);

module.exports = app;
