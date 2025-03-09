import fs from "fs";
import csv from "csv-parser";
import bcrypt from "bcryptjs";
import Student from "../models/studentSchema.js";
import multer from "multer";

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


const upload = multer({ dest: "uploads/" });


export const deleteStudentsFromCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        let deletedCount = 0;
        let notFound = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", async (row) => {
                try {
                    if (row.email) {
                        const student = await Student.findOne({ email: row.email });

                        if (student) {
                            await Student.deleteOne({ email: row.email });
                            deletedCount++;
                        } else {
                            notFound.push(row.email);
                        }
                    }
                } catch (err) {
                    console.error("Error processing row:", err);
                }
            })
            .on("end", () => {
                res.status(200).json({
                    message: `${deletedCount} students deleted successfully.`,
                    notFound: notFound.length > 0 ? notFound : "All students found and deleted",
                });
            });

    } catch (error) {
        console.error("Error deleting students:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
// Export multer upload middleware
export const uploadCSV = upload.single("file");
