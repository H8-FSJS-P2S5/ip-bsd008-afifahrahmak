const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

exports.register = async (req, res, next) => {
  try {
    const { email, password, ...otherData } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    2;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      ...otherData,
    });

    const { password: _, ...userData } = user.get({ plain: true });
    res.status(201).json(userData);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });
    console.log(token);

    res.json({
      message: "Logged in successfully!",
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    next(err);
  }
};

exports.githubLogin = async (req, res, next) => {
  try {
    const { githubToken } = req.body;
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    if (!githubUserResponse.ok) {
      throw new Error("Failed to fetch user data from GitHub.");
    }

    const githubUserData = await githubUserResponse.json();
    let user = await User.findOne({ where: { email: githubUserData.email } });

    if (!user) {
      user = await User.create({
        email: githubUserData.email,
        username: githubUserData.login,
      });
    }
    const appToken = jwt.sign({ userId: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({
      token: appToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error in GitHub login:", error);
    res.status(500).send("An error occurred during GitHub authentication.");
  }
};
