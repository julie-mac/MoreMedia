const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought
}= require('../../controller/thoughtController');

router.route('/').get(getThoughts);
router.route('/:id').get(getSingleThought);
router.route('/').post(createThought);
router.route('/id').put(updateThought);
router.route('/id').delete(deleteThought);

module.exports = router;


