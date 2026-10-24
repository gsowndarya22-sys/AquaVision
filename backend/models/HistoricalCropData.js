const mongoose = require("mongoose");

const historicalCropDataSchema = new mongoose.Schema(
    {
        region: {
            type: String,
            required: true,
            default: "Rayalaseema"
        },

        district: {
            type: String,
            required: true,
            trim: true
        },

        crop: {
            type: String,
            required: true,
            trim: true
        },

        // Agricultural year such as "2020-21"
        year: {
            type: String,
            required: true
        },

        // Area in thousand hectares
        cultivationArea: {
            type: Number,
            required: true
        },

        // Production in thousand tonnes
        production: {
            type: Number,
            required: true
        },

        // Yield in kg per hectare
        yieldPerHectare: {
            type: Number,
            required: true
        }
    },

    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "HistoricalCropData",
        historicalCropDataSchema
    );