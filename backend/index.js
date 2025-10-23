const express = require("express")

const app = express();


require("dotenv").config();
const PORT = process.env.PORT || 3000


app.use(express.json())
const cors = require('cors')
// app.use(cors())

const allowedOrigins = process.env.CLIENT_URLS
    ? process.env.CLIENT_URLS.split(",") : [];


app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.warn("Blocked by CORS:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);


const dbConnect = require('./config/dbConnect')
dbConnect()


// API route mount
const authRoutes = require('./routes/authRoutes')
const stallRoutes = require('./routes/stallRoutes')
const bidRoutes = require('./routes/bidRoutes')
app.use("/api/auth", authRoutes);
app.use("/api/stalls", stallRoutes);
app.use("/api/bids", bidRoutes);

// Activate server
app.listen(PORT, () => {
    console.log(`App  is running at ${PORT}`)
})