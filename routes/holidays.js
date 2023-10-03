const express = require('express');
const router = express.Router();

const holidaysController = require('../controllers/holidays');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate.js');

router.get('/', holidaysController.getAll);
router.get('/:id', holidaysController.getSingle);

router.post('/', auth.isAuthenticated, validation.saveHolidays, holidaysController.createHoliday);

router.put('/:id', auth.isAuthenticated, validation.saveHolidays, holidaysController.updateHoliday);

router.delete('/:id', auth.isAuthenticated, holidaysController.deleteHoliday);

module.exports = router;