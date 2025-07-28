import jwt from 'jsonwebtoken';

const authDoctor = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded Token:", decoded);

    if (!decoded.doctorId) {
      return res.status(403).json({ success: false, message: "Token does not contain doctorId" });
    }

    req.docId = decoded.doctorId;
    req.user = decoded;

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authDoctor;
