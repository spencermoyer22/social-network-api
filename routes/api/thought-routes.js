const router = require('express').Router();
const {createThought, getAllThoughts, getOneThought, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);
router.route('/:id').get(getOneThought).put(updateThought);
router.route('/:userId').post(createThought);
router.route('/:userId/:thoughtId').delete(deleteThought);
router.route('/:thoughtId/reactions').put(createReaction);
router.route('/:userId/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;