const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const fieldRoutes = require("./routes/fieldRoutes");
const irrigationRoutes = require("./routes/irrigationRoutes");
const cropHistoryRoutes = require("./routes/cropHistoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/irrigation",irrigationRoutes);
app.use("/api/crop-history", cropHistoryRoutes);

app.get("/", (req, res) => {
    res.send("AquaVision API is running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`AquaVision backend running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });