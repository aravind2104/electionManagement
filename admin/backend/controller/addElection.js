import Election from "../models/electionSchema.js";

export const addElection = async (req, res) => {
    try {
        const { title, candidates, startDate, startTime, endDate, endTime } = req.body;

        // Validate required fields
        if (!title || !candidates || candidates.length === 0 || !startDate || !startTime || !endDate || !endTime) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Ensure each candidate has a name and position
        for (const candidate of candidates) {
            if (!candidate.name || !candidate.position) {
                return res.status(400).json({ error: "Each candidate must have a name and position" });
            }
        }

        // Determine the status based on current time
        const currentTime = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Create new election
        const newElection = new Election({
            title,
            candidates,
            startDate,
            startTime,
            endDate,
            endTime,
        });

        // Save to database
        await newElection.save();

        res.status(201).json({ message: "Election created successfully", election: newElection });
    } catch (error) {
        console.error("Error creating election:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
