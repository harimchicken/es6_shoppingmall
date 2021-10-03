
import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { product_All, product_Detail, createProduct } from '../controllers/productController.js';

const router = express.Router()



// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', product_All)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', product_Detail)

// @desc    Create a product
// @route   POST /api/products
// @access  Private
router.post('/', protect, createProduct)

export default router