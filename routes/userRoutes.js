
import express from "express";
import passport from "passport";

// import {protect} from "../middleware/authMiddleware.js";

const authCheck = passport.authenticate('jwt', {session: false});

import { registerUser, loginUser, profileUser } from "../controllers/userController.js";


const router = express.Router();

// @desc    User signup
// @route   POST /api/users/signup
// @access  Pubilc
router.post('/signup', registerUser)



// @desc    User login // return jwt
// @route   POST /api/users/login 
// @access  Pubilc
router.post('/login', loginUser)



// @desc    User profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', authCheck, profileUser)

export default router