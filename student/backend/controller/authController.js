import bcrypt from "bcryptjs";
import Student from "../models/studentSchema.js"; // Import student model
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import transporter from "../config/emailConfig.js";
import crypto from 'crypto'
import dotenv from "dotenv";

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
        const isMatch =await bcrypt.compare(password, student.password);
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

    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0) // Expire cookie immediately
    });

    res.status(200).json({ message: "Logged out successfully!" });
};




dotenv.config();



// OTP Storage (Temporary)
const otpStore = new Map(); // { "email": { otp: "123456", expires: 16789012345 } }

export const sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required!" });
    }

    const student = await Student.findOne({ email });
    console.log(student)
    if (!student) {
        return res.status(404).json({ message: "Student not found!" });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in memory with expiration (5 min)
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

    // Send OTP via email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Login",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Error sending OTP" });
        }
        res.status(200).json({ message: "OTP sent successfully" });
    });
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required!" });
    }

    const student=await Student.findOne({email})

    if (!student) {
        return res.status(404).json({ message: "Student not found!" });
    }

    const storedOTP = otpStore.get(email);

    if (!storedOTP) {
        return res.status(400).json({ error: "No OTP found for this email" });
    }

    if (storedOTP.expires < Date.now()) {
        otpStore.delete(email);
        return res.status(400).json({ error: "OTP expired! Request a new one." });
    }

    if (storedOTP.otp !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
    }
    generateTokenAndSetCookie(student, res);
    otpStore.delete(email);

    res.status(200).json({ message: "OTP verified successfully. You are logged in!" });
};



