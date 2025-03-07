import fs from "fs";
import csv from "csv-parser";
import bcrypt from "bcryptjs";
import Student from "../models/studentSchema.js";

export const uploadStudents = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const students = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", async (row) => {
                try {
                    const { name, rollno, email, password } = row;
                    console.log(row)
                    if (!name || !rollno || !email || !password) {
                        console.error("Missing field in CSV row:", row);
                        return; // Skip this row
                    }

                    const hashedPassword = await bcrypt.hash(password, 10);

                    students.push({
                        name,
                        rollno,
                        email,
                        password: hashedPassword,
                    });
                } catch (err) {
                    console.error("Error processing row:", err);
                }
            })
            .on("end", async () => {
                try {
                    await Student.insertMany(students);
                    res.status(201).json({ message: "Students uploaded successfully" });
                } catch (err) {
                    console.error("Error saving students to DB:", err);
                    res.status(500).json({ error: "Failed to save students" });
                }
            });
    } catch (error) {
        console.error("Error uploading students:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
