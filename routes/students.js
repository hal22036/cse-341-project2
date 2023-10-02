const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate.js');

router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getSingle);

router.post('/', auth.isAuthenticated, validation.saveStudent, studentsController.createStudent);

router.put('/:id', auth.isAuthenticated, validation.saveStudent, studentsController.updateStudent);

router.delete('/:id', auth.isAuthenticated, studentsController.deleteStudent);

module.exports = router;