const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const checkAuth = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: { user: req.user, token: req.headers.authorization.split(" ")[1] },
    });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { name, surname, email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser)
      return res
        .status(409)
        .json({ success: false, data: "This e-mail is already taken!" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      name,
      surname,
      password: passwordHash,
    });
    await user.save();

    const token = await jwt.sign(user._doc, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600 * 60 * 60 * 1000),
    });

    res.status(201).json({ success: true, data: { user: user._doc, token } });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser)
      return res
        .status(404)
        .json({ success: false, data: "E-Mail is incorrect." });

    const compare = await bcrypt.compare(password, findUser._doc.password);

    if (!compare)
      return res
        .status(401)
        .json({ success: false, data: "Password is incorrect." });

    const token = await jwt.sign(findUser._doc, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 saat
    });

    res.status(200).json({ success: true, data: { user: findUser, token } });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

module.exports = {
  checkAuth,
  registerUser,
  loginUser,
};
