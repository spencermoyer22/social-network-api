const router = require('express').Router();
const {createUser, getAllUsers, getOneUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;