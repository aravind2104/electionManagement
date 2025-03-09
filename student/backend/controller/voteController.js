import Election from "../models/electionSchema.js";
import Student from "../models/studentSchema.js";
import CryptoJS from "crypto-js";


export const voteForCandidate = async (req, res) => {
    try {
        const { electionId, candidateName } = req.params;
        const studentId = req.student._id;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ error: "Election not found" });
        }

        if (student.hasVoted.includes(electionId)) {
            return res.status(400).json({ error: "You have already voted in this election" });
        }
      
        // Find the candidate in the election's candidates array
        const candidate = election.candidates.find(c => c.name === candidateName);
        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found in this election" });
        }

        // Increase candidate's vote count
        candidate.votes += 1;

        // Save the updated election
        await election.save();

        // Add this election to the student's `hasVoted` array
        student.hasVoted.push(electionId);
        await student.save();

        res.status(200).json({ message: "Vote cast successfully", election });
    } catch (error) {
        console.error("Error voting:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
