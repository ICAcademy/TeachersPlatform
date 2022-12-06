const { upload, erase } = require('../services/FirebaseService');

const uploadPhoto = (req, res) => {
  try {
    const storageURL = upload(req.file);
    res.status(200).send(storageURL);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const deletePhoto = (req, res) => {
  try {
    const { name } = req.params;
    erase(name);
    res.status(200).send('file deleted');
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = { uploadPhoto, deletePhoto };
