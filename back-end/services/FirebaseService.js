const saltedMd5 = require('salted-md5');
const path = require('path');
const admin = require('firebase-admin');
// const Multer = require('multer');

const serviceAccount = process.env.FIREBASE_ADMIN_API;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: 'https://teachers-platform-40cbe-default-rtdb.firebaseio.com',
  storageBucket: process.env.BUCKET_URL,
});

const storage = admin.storage().bucket();

// Multer({
//   fileFilter: (req, file, cb) => {
//     checkFileType(req, file, cb);
//   },
// });

// const checkFileType = (req, file, cb) => {
//   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//     req.error = new Error('Only images are allowed');
//     return cb(null, false);
//   }
//   return cb(null, true);
// };

const upload = (file) => {
  const name = saltedMd5(file.originalname, 'SUPER-S@LT!');
  const fileName = name + path.extname(file.originalname);
  const fileToUpload = storage.file(fileName);
  fileToUpload.createWriteStream().end(file.buffer);
  const storageURL = fileToUpload.publicUrl();
  if (file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return storageURL;
  }
  return false;
};

const erase = (url) => {
  storage.file(url).delete();
};

module.exports = { upload, erase };
