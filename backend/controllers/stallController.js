import Stall from "../models/Stall.js";
import Bid from "../models/Bid.js";


export const createStall = async (req, res) => {
    try {
        const { name, description, basePrice } = req.body;
        if(!name || !basePrice){
            return res.status(400).json({
                success: false,
                message: "All data required",
            });
        }

        if (req.user.role !== "principal") {
            return res.status(403).json({
                message: "Only principals can create stalls."
            });
        }

        const stall = await Stall.create({
            name,
            description,
            basePrice,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Stall created successfully.",
            stall,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while creating stall." });
    }
};


export const getAllStalls = async (req, res) => {
    try {
        const stalls = await Stall.find()
            .populate("createdBy", "name email role")
            .populate({
                path: "highestBid",
                populate: { path: "user", select: "name email" },
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            stalls
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while fetching stalls."
        });
    }
};

export const getStallById = async (req, res) => {
    try {
        const stall = await Stall.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate({
                path: "highestBid",
                populate: { path: "user", select: "name email" },
            });

        if (!stall) return res.status(404).json({
            message: "Stall not found."
        });

        res.status(200).json({
            success: true,
            stall
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while fetching stall details."
        });
    }
};


export const updateStall = async (req, res) => {
    try {
        if (req.user.role !== "principal") {
            return res.status(403).json({
                message: "Only principals can update stalls."
            });
        }

        const stall = await Stall.findById(req.params.id);
        if (!stall) return res.status(404).json({
            message: "Stall not found."
        });

        const updated = await Stall.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Stall updated successfully.",
            updated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while updating stall."
        });
    }
};


export const deleteStall = async (req, res) => {
    try {
        if (req.user.role !== "principal") {
            return res.status(403).json({
                message: "Only principals can delete stalls."
            });
        }

        const stall = await Stall.findById(req.params.id);
        if (!stall) return res.status(404).json({
            message: "Stall not found."
        });

        if (stall.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ 
                message: "You can only modify your own stalls." 
            });
        }

        await stall.deleteOne();

        res.status(200).json({
            success: true,
            message: "Stall deleted successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while deleting stall."
        });
    }
};

export const markStallAsSold = async (req, res) => {
    try {
        if (req.user.role !== "principal") {
            return res.status(403).json({
                message: "Only principals can mark stalls as sold."
            });
        }

        const stall = await Stall.findById(req.params.id);
        if (!stall) return res.status(404).json({
            message: "Stall not found."
        });

        stall.isSold = true;
        await stall.save();

        res.status(200).json({
            success: true,
            message: "Stall marked as sold successfully.",
            stall,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while marking stall as sold."
        });
    }
};
