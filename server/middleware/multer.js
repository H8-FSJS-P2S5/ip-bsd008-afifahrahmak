const multer = require("multer");
// const multer = require("multer");
// Ada dua opsi antara Memory Stroge & Disk Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
// console.log("<<<<<<<<<<<<<<<<<<,ssss");
const middlewareUpload = upload.single("imageUrl");
const middlewareUploadImageProfile = upload.single("imageProfile");

module.exports = { middlewareUpload, middlewareUploadImageProfile };
