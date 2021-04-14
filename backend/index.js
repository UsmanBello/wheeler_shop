require('dotenv').config()
const express = require('express');
const connectDB= require('./config/db');
const productRoutes= require('./routes/productRoutes.js');
const orderRoutes= require('./routes/orderRoutes');
const PORT = process.env.Port || 5000;

connectDB();
const app= express();

app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)



app.listen(PORT, () => console.log(`App listening on port ${PORT}`))