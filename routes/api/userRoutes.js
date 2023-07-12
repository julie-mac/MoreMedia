const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controller/userController');

router.route('/').get(getUsers);
router.route('/:id').get(getSingleUser);
router.route('/').post(createUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/:id/friends/:friendId').post(addFriend);
router.route('/:id/friends/:friendId').delete(removeFriend);

module.exports = router;


