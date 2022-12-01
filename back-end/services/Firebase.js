const express = require('express');
const saltedMd5 = require('salted-md5');
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config({ path: '../.env' });
app.set('views', path.join(__dirname, 'static', 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'static', 'public')));

const router = express.Router();

const admin = require('firebase-admin');
const serviceAccount = process.env.FIREBASE_ADMIN_API;

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: 'https://teachers-platform-40cbe-default-rtdb.firebaseio.com',
  storageBucket: process.env.BUCKET_URL,
});

const storage = admin.storage().bucket();

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!');
    const fileName = name + path.extname(req.file.originalname);
    const fileToUpload = storage.file(fileName);
    fileToUpload.createWriteStream().end(req.file.buffer);
    const storageURL = fileToUpload.publicUrl();
    res.status(200).send(storageURL);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
