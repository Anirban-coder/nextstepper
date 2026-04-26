const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const profileRoutes = require("./routes/profileRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/careers", require("./routes/careerRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);
app.get("/", (req, res) => {
  res.send("NextStepper API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
