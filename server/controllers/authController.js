const User = require("../models/User");
const Resume = require("../models/Resume");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  try {
    // 1️⃣ Extract Text Data
    // Note: When using FormData, numbers come as strings, so we might need to parse them if strictly needed, 
    // but Mongoose handles casting usually.
    const { name, email, password, role, gender, expertise, experience } = req.body;

    // 2️⃣ Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create User Object (Dynamic based on role)
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || "student", // Default to student
    };

    if (role === "student") {
      userData.gender = gender;
    } else if (role === "teacher") {
      userData.expertise = expertise;
      userData.experience = experience;
    }

    const user = await User.create(userData);

    // 5️⃣ Create Resume (Only if Student OR if file is uploaded)
    // Even teachers might want a profile, but the file upload is mainly for students per your request.
    
    let resumeData = { user: user._id };
    
    // If a file was uploaded, save the path
    if (req.file) {
      resumeData.fileUrl = req.file.path; // e.g., "uploads/resume-123.pdf"
    }

    const resume = await Resume.create(resumeData);

    // Link Resume to User
    user.resume = resume._id;
    await user.save();

    // 6️⃣ Respond
    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      role: user.role,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN (Keep existing) =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, // 👈 Added role to token payload
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 👈 Send role to frontend
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};