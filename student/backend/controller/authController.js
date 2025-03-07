import bcrypt from "bcryptjs";
import Student from "../models/studentSchema.js"; // Import student model
import { generateTokenAndSetCookie } from "../utils/generateToken.js";


export const login = async (req, res) => {
    console.log("Logging in...");

    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password!" });
        }

        // Check if the student exists
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: "Student not found!" });
        }

        // Compare password using bcrypt
        const isMatch = password===student.password//await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(student, res);

        res.status(200).json({
            message: "Login successful",
            student: { id: student._id, name: student.name, email: student.email, hasVoted: student.hasVoted }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error, please try again later!" });
    }
};


export const logout = (req, res) => {
    console.log("Logging out...");

    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0) // Expire cookie immediately
    });

    res.status(200).json({ message: "Logged out successfully!" });
};
