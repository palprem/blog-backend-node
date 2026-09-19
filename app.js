require('dotenv').config()
const express = require("express");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { default: mongoose } = require("mongoose");
const CORS = require("cors");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("database error", err));

// CORS
app.use(CORS({
    origin: "http://localhost:5173",
    credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/auth", userRoute);
app.use("/blogs", checkForAuthenticationCookie("token"), blogRoute);

// Image serve public folder
app.use("/public", express.static(path.join(__dirname, "public"))
);
// Global error handler
app.use((err, req, res, next) => {
    console.error("Global error:>>>>>>>>>", err);

    res.status(500).json({
        success: false,
        message: err.message,
    });
});

app.listen(PORT, () => console.log(`Server runing on port:${PORT}`));