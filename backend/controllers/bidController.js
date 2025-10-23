import Bid from "../models/Bid.js";
import Stall from "../models/Stall.js";
import User from "../models/User.js";
// import { sendEmail } from "../utils/sendEMail.js";
import { sendMail } from "../config/mailService.js";



// Place a bid 
export const placeBid = async (req, res) => {
    try {
        const { stallId, amount } = req.body;
        const userId = req.user._id;

        if(!stallId || !amount || !userId){
            return res.status(400).json({
                success: false,
                message: "All data required",
            });
        }

        const stallForExpiry = await Stall.findById(stallId);
        // Check if stall has expired
        const createdAt = new Date(stallForExpiry.createdAt);
        const now = new Date();
        const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

        if (diffInDays > 30) {
            stallForExpiry.isSold = true;
            await stallForExpiry.save(); 
 
            return res.status(400).json({ 
                message: "This stall's bidding period has ended (30 days passed).",
            });
        }

        if (!stallId || !amount)
            return res.status(400).json({
                message: "Stall ID and bid amount are required."
            });

        if (typeof amount !== "number" || amount <= 0)
            return res.status(400).json({
                message: "Bid amount must be a positive number."
            });

        if (req.user.role !== "student")
            return res.status(403).json({
                message: "Only students can place bids."
            });

        const stall = await Stall.findById(stallId)
            .populate({
                path: "highestBid",
                populate: { path: "user", select: "name email" },
            })
            .populate("createdBy", "name email");

        if (!stall)
            return res.status(404).json({
                message: "Stall not found."
            });
        if (stall.isSold)
            return res.status(400).json({
                message: "This stall is already sold."
            });


        const currentHighest = stall.highestBid ? stall.highestBid.amount : stall.basePrice;
        if (amount <= currentHighest) {
            return res.status(400).json({
                message: `Bid amount must be higher than the current highest bid (${currentHighest}).`,
            });
        }

        const previousHighestBid = stall.highestBid;

        const newBid = await Bid.create({
            stall: stallId,
            user: userId,
            amount,
        });

        stall.highestBid = newBid._id;
        await stall.save();

        if (previousHighestBid && previousHighestBid.user && previousHighestBid.user.email) {
            const to = previousHighestBid.user.email;
            const subject= `You were outbid on "${stall.name}"`;
            const text = `Hi ${previousHighestBid.user.name}, your bid has been outbid by ${amount}.`;
            await sendMail(to, subject, text)
            
            // try {
            //     await sendEmail({
            //         to: previousHighestBid.user.email,
            //         subject: `You were outbid on "${stall.name}"`,
            //         text: `Hi ${previousHighestBid.user.name}, your bid has been outbid by ${amount}.`,
            //     });

            // } catch (err) {
            //     console.error("Failed to notify previous bidder:", err.message);
            // }
        }

        if (stall.createdBy?.email) {

            const to = stall.createdBy.email;
            const subject = `New bid on "${stall.name}"`;
            const text = `${req.user.name} just placed a bid of ${amount} on your stall.`;
            await sendMail(to, subject, text)

            // await sendEmail({
            //     to: stall.createdBy.email,
            //     subject: `New bid on "${stall.name}"`,
            //     text: `${req.user.name} just placed a bid of ${amount} on your stall.`,
            // });
        }

        const to = req.user.email;
        const subject = `Bid placed on "${stall.name}"`;
        const text = `Your bid of ${amount} has been placed successfully.`;
        await sendMail(to, subject, text)

        // await sendEmail({
        //     to: req.user.email,
        //     subject: `Bid placed on "${stall.name}"`,
        //     text: `Your bid of ${amount} has been placed successfully.`,
        // });

        return res.status(201).json({
            success: true,
            message: "Bid placed successfully.",
            bid: newBid,
            updatedStall: stall,
        });
    } catch (error) {
        console.error("Error placing bid:", error);
        res.status(500).json({
            message: "Server error while placing bid."
        });
    }
};


export const getBidsByStall = async (req, res) => {
    try {
        const stallId = req.params.stallId;
        if(!stallId){
            return res.status(400).json({
                success: false,
                message: "StallId not found",
            });
        }

        const bids = await Bid.find({ stall: stallId })
            .populate("stall", "name")
            .populate("user", "name email")
            .sort({ amount: -1, createdAt: 1 });

        res.status(200).json({
            success: true,
            bids,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while fetching bids."
        });
    }
};


export const getBidsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "UserId not found",
            });
        }

        const bids = await Bid.find({ user: userId })
            .populate("stall", "name basePrice isSold")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bids,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while fetching user bids."
        });
    }
};
