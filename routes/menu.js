const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate.js');

router.get('/', menuController.getAll);
router.get('/:id', menuController.getSingle);

router.post('/', auth.isAuthenticated, validation.saveMenu, menuController.createMenu);

router.put('/:id', auth.isAuthenticated, validation.saveMenu, menuController.updateMenu);

router.delete('/:id', auth.isAuthenticated, menuController.deleteMenu);

module.exports = router;