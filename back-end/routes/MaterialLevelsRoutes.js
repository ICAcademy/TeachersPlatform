const express = require('express');

const { getLevels, getUnitsByLevel } = require('../controllers/MaterialController');

const router = express.Router();

router.route('/').get(getLevels);
router.route('/get-units-by-level/:level').get(getUnitsByLevel);

module.exports = router;
