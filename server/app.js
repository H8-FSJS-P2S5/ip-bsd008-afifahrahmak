require("dotenv").config();
const express = require("express");
const { router } = require("./routers");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const port = 3000;

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
//! error handler
app.use(errorHandler);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
