import multer from "multer";
import AppError from "../utils/AppError.js";


export const uploadSingleFile = (folderName, fieldName) => {
  //* use of multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the directory where uploaded files will be saved
    cb(null, `uploads/${folderName}`);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename to prevent conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  console.log(file)
  // Validate uploaded file type (MIME type)
  if (file.mimetype.startsWith("image")) {
    // Allow only image files
    cb(null, true);
  } else {
     // Reject non-image files with a custom error
    cb(new AppError('invalid image', 400), false)
  }
}

const upload = multer({ storage, fileFilter });
return upload.single(fieldName)
}
