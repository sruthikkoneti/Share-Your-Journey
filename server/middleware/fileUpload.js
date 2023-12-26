import multer from "multer";
import * as fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const createStorageEngine = () => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `./file_uploads/${req.user.user_id}`;
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, dir);
      });
    },
    filename: function (req, file, cb) {
      let fileName = uuidv4() + path.extname(file.originalname);
      req.filePath = `file_uploads/${req.user.user_id}/${fileName}`;
      cb(null, fileName);
    },
  });
}

export const uploadPost = (req, res, next) => {
  const multerUpload = multer({ storage: createStorageEngine() }).array("photos", 5);

  multerUpload(req, res, (err) => {
    if (err) {
      // Handle multer error
      return res.status(500).send("File upload failed");
    }
    // File upload successful
    // Access req.filePath to get the file path
    next();
  });
};
