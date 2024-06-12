import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res.status(401).json({ success: false, data: "Token not found!" });

    const user = await jwt.verify(token, process.env.JWT_SECRET);
    if (!user)
      return res.status(401).json({ success: false, data: "Invalid token!" });

    req.user = user;

    next();
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};
