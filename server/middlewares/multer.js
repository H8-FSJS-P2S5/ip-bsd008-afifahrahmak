const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const middlewaresUpload = upload.single("photoProfile");

module.exports = middlewaresUpload;
