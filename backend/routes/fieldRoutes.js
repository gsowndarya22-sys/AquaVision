const express = require("express");
const Field = require("../models/Field");

const router = express.Router();


// Add a field
router.post("/", async (req, res) => {
    try {
        const {
            farmer,
            location,
            fieldSize,
            crop,
            soilType,
            irrigationMethod
        } = req.body;

        if (
            !farmer ||
            !location ||
            !fieldSize ||
            !crop ||
            !soilType ||
            !irrigationMethod
        ) {
            return res.status(400).json({
                message: "Please provide all field details"
            });
        }

        const field = await Field.create({
            farmer,
            location,
            fieldSize,
            crop,
            soilType,
            irrigationMethod
        });

        res.status(201).json({
            message: "Field added successfully",
            field
        });

    } catch (error) {
        console.error("Field creation error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// Get all fields of a farmer
router.get("/:farmerId", async (req, res) => {
    try {
        const fields = await Field.find({
            farmer: req.params.farmerId
        });

        res.status(200).json(fields);

    } catch (error) {
        console.error("Field fetching error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;