require('dotenv').config();
require('./config/db.config');
require("dotenv").config();

const express = require('express');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', require('./routes/authRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/customer', require('./routes/customerRoutes'));
app.use('/measurement', require('./routes/measurementRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));

// 👇 ADD THIS
app.get('/__routes', (req, res) => {
    const routes = [];
    app._router.stack.forEach(layer => {
        if (layer.route) {
            const method = Object.keys(layer.route.methods)[0].toUpperCase();
            routes.push({ method, path: layer.route.path });
        }
    });
    res.json(routes);
});

app.listen(5000, () => console.log("Server running on port 5000"));
