const firebaseService = require('../services/FirebaseService');

const uploadPhoto = (req, res) => {
  try {
    const storageURL = firebaseService.upload(req.file);
    res.status(200).send(storageURL);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const deletePhoto = (req, res) => {
  try {
    const { name } = req.params;
    if (name !== '') {
      return res.status(400).send('please provide name');
    }
    firebaseService.erase(name);
    res.status(200).send('file deleted');
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = { uploadPhoto, deletePhoto };
