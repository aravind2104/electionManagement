import jwt from 'jsonwebtoken';
import Student from '../models/studentSchema.js';

const protectRoute = async (req, res, next) => {
    try {
        // Check if token exists
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch student from database
        const student = await Student.findById(decoded.userId).select("-password");
        if (!student) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach student to request object
        req.student = student;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(401).json({ error: "Unauthorized - Invalid or Expired Token" });
    }
};

export default protectRoute;
