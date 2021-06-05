const router = require('express').Router();
const {createUser, getAllUsers, getOneUser, updateUser, deleteUser} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;