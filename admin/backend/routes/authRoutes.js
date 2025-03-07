import express from 'express'
import { adminLogin, adminLogout, adminSignup } from '../controller/authController.js';

const router=express.Router()
router.post("/login",adminLogin)
router.post("/logout",adminLogout)
router.post("/signup",adminSignup)
export default router