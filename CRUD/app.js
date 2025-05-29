const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./controller')
const mongoose = require('mongoose')

dotenv.config()
const app = express()
app.use(express.json())

app.use('/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.error(err));