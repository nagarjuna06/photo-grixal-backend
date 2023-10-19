import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const checkFileType = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 3500000 },
  fileFilter: checkFileType,
});

export default upload;
