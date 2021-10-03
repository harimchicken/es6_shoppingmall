import express from 'express';
import bodyParser from 'body-parser';
import morgan, { format } from 'morgan';
import cors from 'cors';
import colors from 'colors';

import dotEnv, { config } from 'dotenv';
import { errorHandler, notFound } from './middleware/errMiddleware.js';
import connectDB from './config/db.js';
import passport from 'passport';
import { protect } from './config/passport.js';


// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotEnv.config();

const app = express()

// connectDB
connectDB()

// passport middleware
app.use(passport.initialize())

// passport config
protect(passport)


// middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


// global error handler
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`.yellow.bold)
})