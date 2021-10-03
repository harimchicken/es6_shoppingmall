import asynchandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public

const registerUser = asynchandler( async (req, res) => {
    const {name, email, password} = req.body;
    
    const userExists = await userModel.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await userModel.create({
        name, email, password
    })

    if (user) {
        res.status(201).json(user)
    } else {
        res.status(400)
        throw new Error('Invaild user data')
    }
})

// @desc    User login // return jwt
// @route   POST /api/users/login 
// @access  Pubilc

const loginUser = asynchandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            userInfo: user,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invaild email or password')
    }
})

// @desc    User profile
// @route   GET /api/users/profile
// @access  Private

const profileUser = asynchandler( async (req, res) => {
    const user = await userModel.findById(req.user._id)
    console.log(user)
    if (user) {
        // user.password = undefined;
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})



export { registerUser, loginUser, profileUser }