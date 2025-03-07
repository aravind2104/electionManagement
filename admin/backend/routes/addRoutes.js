import express from 'express'
import { getElectionById, getElections } from '../controller/electionController.js'

const router=express.Router()

router.get("/home",protectRoute,getElections)
export default router