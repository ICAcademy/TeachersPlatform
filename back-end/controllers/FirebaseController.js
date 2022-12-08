const firebaseService = require('../services/FirebaseService');

const uploadPhoto = async (req, res) => {
  try {
    const storageURL = await firebaseService.uploadFile(req.file);
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      res.status(400).send('Only images allowed');
    }
    res.json(storageURL);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).send('please provide file name');
    }
    await firebaseService.deleteFile(name);
    res.status(200).send('file deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { uploadPhoto, deletePhoto };
