const express = require('express');
const saltedMd5 = require('salted-md5');
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config();
app.set('views', path.join(__dirname, 'static', 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'static', 'public')));

const router = express.Router();

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://teachers-platform-40cbe-default-rtdb.firebaseio.com',
  storageBucket: process.env.BUCKET_URL,
});

app.locals.bucket = admin.storage().bucket();

router.post('/', upload.single('file'), async (req, res) => {
  const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!');
  const fileName = name + path.extname(req.file.originalname);
  await app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer);
  res.send('done');
});

module.exports = router;
