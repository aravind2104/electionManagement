import fs from "fs";
import csv from "csv-parser";
import bcrypt from "bcryptjs";
import Student from "../models/studentSchema.js";

export const uploadStudents = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", async (row) => {
                try {
                    const { name, rollno, email, password } = row;

                    if (!name || !rollno || !email || !password) {
                        console.warn("Skipping row due to missing fields:", row)
                        return;
                    }

                    const existingStudent = await Student.findOne({ email });
                    if (existingStudent) {
                        console.warn(`Skipping duplicate student: ${email}`)
                        return;
                    }

                    const hashedPassword = await bcrypt.hash(password, 10);

                    const newStudent = new Student({
                        name,
                        rollno,
                        email,
                        password: hashedPassword,
                    });

                    await newStudent.save();
                    insertedCount++;
                } catch (err) {
                    console.error("Error processing row:", err);
                }
            })
            .on("end", () => {
                console.log(`Upload complete`);
                res.status(201).json({
                    message: "Student upload completed",

                });
            });
   
    } catch (error) {
        console.error("Error uploading students:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
