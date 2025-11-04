import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const token = req.headers.atoken;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized / Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized / Login Again" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.json({ success: false, message: "Not Authorized / Login Again" });
  }
};

export default authAdmin;
