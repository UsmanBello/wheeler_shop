require('dotenv').config()
const express = require('express');
const connectDB= require('./config/db');
const productRoutes= require('./routes/productRoutes.js');
const orderRoutes= require('./routes/orderRoutes');
const customerRoutes= require('./routes/customerRoutes');
const requestRoutes= require('./routes/requestRoutes');
const authRoutes= require('./routes/authRoutes.js');
const PORT = process.env.PORT || 5000;

connectDB();
const app= express();
app.use(express.json({limit: '50mb'}))
// app.use(express.urlencoded({limit:'50mb', extended: true}));

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(express.static(__dirname+"/public"));
app.post('/',(req, res)=>{
    res.send('Hello')
})
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/auth', authRoutes)


app.listen(PORT, () => console.log(`App listening on port ${PORT}`))