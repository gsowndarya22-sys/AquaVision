const express = require("express");
const HistoricalCropData = require("../models/HistoricalCropData");


const router = express.Router();

// Add historical crop data
router.post("/", async (req, res) => {
    try {
        const {
            region,
            district,
            crop,
            year,
            cultivationArea,
            production,
            yieldPerHectare
        } = req.body;

        if (
            !region ||
            !district ||
            !crop ||
            !year ||
            cultivationArea === undefined ||
            production === undefined ||
            yieldPerHectare === undefined
        ) {
            return res.status(400).json({
                message: "Please provide all historical crop details"
            });
        }

        const data = await HistoricalCropData.create({
            region,
            district,
            crop,
            year,
            cultivationArea,
            production,
            yieldPerHectare
        });

        res.status(201).json({
            message: "Historical crop data added successfully",
            data
        });

    } catch (error) {
        console.error("Historical crop data error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// Get all historical crop data
router.get("/", async (req, res) => {
    try {
        const data = await HistoricalCropData.find()
            .sort({ year: -1 });

        res.status(200).json(data);

    } catch (error) {
        console.error("Historical crop data fetch error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// Get historical data by crop
router.get("/crop/:cropName", async (req, res) => {
    try {
        const data = await HistoricalCropData.find({
            crop: req.params.cropName,
            region: "Rayalaseema"
        }).sort({ year: -1 });

        res.status(200).json(data);

    } catch (error) {
        console.error("Crop history fetch error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deletedData = await HistoricalCropData.findByIdAndDelete(
            req.params.id
        );

        if (!deletedData) {
            return res.status(404).json({
                message: "Historical crop data not found"
            });
        }

        res.status(200).json({
            message: "Historical crop data deleted successfully",
            data: deletedData
        });

    } catch (error) {
        console.error("Historical crop data delete error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});
module.exports = router;