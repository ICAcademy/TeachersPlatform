const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config({ path: '../.env' });
const { uploadPhoto, deletePhoto } = require('../controllers/FirebaseController');

const router = express.Router();

router.post('/upload-photo', upload.single('file'), uploadPhoto);
router.delete('/delete-photo/:name', deletePhoto);

module.exports = router;
