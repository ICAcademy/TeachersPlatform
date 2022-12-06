const saltedMd5 = require('salted-md5');
const path = require('path');
const admin = require('firebase-admin');

const serviceAccount = process.env.FIREBASE_ADMIN_API;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: 'https://teachers-platform-40cbe-default-rtdb.firebaseio.com',
  storageBucket: process.env.BUCKET_URL,
});

const storage = admin.storage().bucket();

const upload = (file) => {
  const name = saltedMd5(file.originalname, 'SUPER-S@LT!');
  const fileName = name + path.extname(file.originalname);
  const fileToUpload = storage.file(fileName);
  fileToUpload.createWriteStream().end(file.buffer);
  const storageURL = fileToUpload.publicUrl();
  return storageURL;
};

const erase = (url) => {
  storage.file(url).delete();
};

module.exports = { upload, erase };
