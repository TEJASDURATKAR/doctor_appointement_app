import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is the admin
    if (
      decoded.email !== process.env.ADMIN_EMAIL_ID ||
      decoded.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("🔴 Admin Auth Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authAdmin;
