
import asyncHandler from 'express-async-handler';
import productModel from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const product_All = asyncHandler(async (req, res) => {
    const products = await productModel.find()
    res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public

const product_Detail = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private / only admin

const createProduct = asyncHandler( async (req, res) => {
    
    const { name, price, brand, category, countInStock, numReviews, description} = req.body;
    const product = new productModel({
        name, price, brand, category, countInStock, numReviews, description,
        user: req.user._id
    })

    const createProduct = await product.save()
    res.json(createProduct)
})

export { product_All, product_Detail, createProduct }