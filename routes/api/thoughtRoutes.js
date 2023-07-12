const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
}= require('../../controller/thoughtController');

router.route('/').get(getThoughts);
router.route('/:id').get(getSingleThought);
router.route('/').post(createThought);
router.route('/:id').put(updateThought);
router.route('/:id').delete(deleteThought);
router.route('/:id/reactions').post(addReaction);
router.route('/:id/reactions/:reactionId').delete(deleteReaction);


module.exports = router;


