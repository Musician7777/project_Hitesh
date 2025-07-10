import multer from 'multer'; //Helps in file uploading, express can't do that.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); //To avoid same name conflicts.
    cb(null, file.originalname); //Instead fielsname -> originalname.
  }
});

export const upload = multer({ storage });