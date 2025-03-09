import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollno: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hasVoted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Election" }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
