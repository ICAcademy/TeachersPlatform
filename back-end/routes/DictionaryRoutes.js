const express = require('express');

const router = express.Router();

const {
  getDictionaryByStudentId,
  createDictionary,
  getDictionaryById,
  updateDictionary,
  deleteDictionary,
} = require('../controllers/DictionaryController');

router.post('/', createDictionary);
router.get('/', getDictionaryByStudentId);
router.get('/:id', getDictionaryById);
router.patch('/:id', updateDictionary);
router.delete('/:id', deleteDictionary);

module.exports = router;
