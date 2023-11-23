//app.js
const express = require("express");
const passport = require("passport");
const app = express();
const port = 3000;
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const CLIENT_ID_GITHUB = "827517944c04238a7f37";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");
const CLIENT_SECRET = "81b5c6ef7b153647a28d1abe466a772c6d23d0f3";
function createToken(userId) {
  return jwt.sign({ id: userId }, "your_secret_key", { expiresIn: "1h" });
}

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const profileRoutes = require("./routes/profileRoutes");

// Use routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/profiles", profileRoutes);

app.use(errorHandler);

module.exports = app;

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
