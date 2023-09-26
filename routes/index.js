const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //swagger.tags=['Jeni Hales']
    res.send('Jeni Hales');
});

router.use('/students', require('./students'));
router.use('/teachers', require('./teachers'));

module.exports = router;