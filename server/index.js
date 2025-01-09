require("dotenv").config();
const connect = require('./user.js');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const companyCountRoutes = require("./routes/companyCount");

connect();

const express = require('express');
const app = express();
const cors = require("cors");

// Allow requests from the frontend URL
const allowedOrigins = ['https://authhyclient.vercel.app']; 

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/companyCount", companyCountRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
