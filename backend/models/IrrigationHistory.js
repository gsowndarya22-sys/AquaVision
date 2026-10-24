const mongoose = require("mongoose");

const irrigationHistorySchema = new mongoose.Schema(
    {
        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        field: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Field",
            required: false
        },

        crop: {
            type: String,
            required: true,
            trim: true
        },

        area: {
            type: Number,
            required: true
        },

        soilMoisture: {
            type: Number,
            required: true
        },

        rainfall: {
            type: Number,
            default: 0
        },

        waterRequired: {
            type: Number,
            required: true
        },

        recommendation: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "IrrigationHistory",
    irrigationHistorySchema
);