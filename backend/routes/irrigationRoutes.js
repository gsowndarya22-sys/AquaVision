const express = require("express");
const IrrigationHistory = require("../models/IrrigationHistory");

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("1. IRRIGATION REQUEST RECEIVED");

    try {
        console.log("2. Request body:", req.body);

        const {
            farmer,
            field,
            crop,
            area,
            soilMoisture,
            rainfall,
            waterRequired,
            recommendation
        } = req.body;

        if (
            !farmer ||
            !crop ||
            !area ||
            soilMoisture === undefined ||
            waterRequired === undefined ||
            !recommendation
        ) {
            console.log("3. Missing required data");

            return res.status(400).json({
                message: "Please provide all irrigation details"
            });
        }

        console.log("3. Validation passed");

        const record = await IrrigationHistory.create({
            farmer,
            field,
            crop,
            area,
            soilMoisture,
            rainfall: rainfall || 0,
            waterRequired,
            recommendation
        });

        console.log("4. RECORD CREATED");

        res.status(201).json({
            message: "Irrigation record saved successfully",
            record
        });

    } catch (error) {
        console.error("ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

router.get("/:farmerId", async (req, res) => {
    try {
        const records = await IrrigationHistory.find({
            farmer: req.params.farmerId
        }).sort({ createdAt: -1 });
        res.status(200).json(records);

    } catch (error) {
        console.error("Irrigation history fetch error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;