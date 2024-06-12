const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const splitted = req.headers?.authorization.split(" ");

    if (splitted[0] !== "Bearer")
      return res.status(401).json({ success: false, data: "Invalid token!" });

    const token = splitted[1];
    if (!token)
      return res.status(401).json({ success: false, data: "Token not found!" });

    const user = await jwt.verify(token, process.env.JWT_SECRET);
    if (!user)
      return res.status(401).json({ success: false, data: "Invalid token!" });

    req.user = user;

    next();
  } catch (e) {
    res.status(500).json({ success: false, data: "Unauthorized" });
  }
};

module.exports = authMiddleware;
