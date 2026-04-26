const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || "");
    callback(null, `resume-${Date.now()}${extension}`);
  },
});

const fileFilter = (_req, file, callback) => {
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const extension = path.extname(file.originalname || "").toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    callback(new Error("Only PDF, DOC, and DOCX files are allowed."));
    return;
  }

  callback(null, true);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
