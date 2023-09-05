const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Use the expenseRoutes router
app.use('/expenses', expenseRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected Successfully!");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(process.env.PORT, () => {
    console.log('Listening', process.env.PORT);
});