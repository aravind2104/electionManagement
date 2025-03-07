
import express from "express";
import protectRoute from "../middleware/protecRoute.js";
import { voteForCandidate } from "../controller/voteController.js";

const router = express.Router();

// Voting route (requires authentication)
router.post("/:electionId/:candidateName", protectRoute, voteForCandidate);

export default router;
