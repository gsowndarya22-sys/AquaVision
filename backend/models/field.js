const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
    {
        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        fieldSize: {
            type: Number,
            required: true
        },

        crop: {
            type: String,
            required: true,
            trim: true
        },

        soilType: {
            type: String,
            required: true,
            trim: true
        },

        irrigationMethod: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Field", fieldSchema);