if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;
const app = require("../app");

//runner/listener
app.listen(port, () => {
  console.log(`Running: http://localhost:${port}`);
});
