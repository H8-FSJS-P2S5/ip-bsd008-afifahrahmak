if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = require("./routers/index");
const app = express();
const port = process.env.PORT || 3000;
const errorHandler = require("./middlewares/errorHandling");

app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`I Love You ${port}`);
});
