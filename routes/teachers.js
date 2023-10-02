const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teachers');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate.js');

router.get('/', teachersController.getAll);
router.get('/:id', teachersController.getSingle);

router.post('/', auth.isAuthenticated, validation.saveTeacher, teachersController.createTeacher);

router.put('/:id', auth.isAuthenticated, validation.saveTeacher, teachersController.updateTeacher);

router.delete('/:id', auth.isAuthenticated, teachersController.deleteTeacher);

module.exports = router;