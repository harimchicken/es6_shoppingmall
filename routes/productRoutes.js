import express from "express";
import asyncHandler from "express-async-handler";


const router = express.Router()


// @desc    Fetch all products
// @route   Get /api/products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {

}))

// @desc    Fetch single product
// @route   Get /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    
}))

export default router