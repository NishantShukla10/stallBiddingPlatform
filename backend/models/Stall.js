import mongoose from "mongoose";

const stallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    highestBid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
    },
    isSold: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model("Stall", stallSchema);
