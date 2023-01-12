const { Router } = require('express');

const router = Router();

const {
  createDictionary,
  getDictionaryByStudentId,
  getDictionary,
  updateDictionary,
  deleteDictionary,
} = require.main.require('./controllers/DictionaryController');

router.post('/', createDictionary);
router.get('/', getDictionaryByStudentId);
router.get('/:id', getDictionary);
router.patch('/:id', updateDictionary);
router.delete('/:id', deleteDictionary);

module.exports = router;
