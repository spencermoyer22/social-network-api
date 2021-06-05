const {Thought, User} = require('../models');
const { db } = require('../models/Thought');

const thoughtController = {
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true, runValidators: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id'})
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    getOneThought({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({message: 'No thought found with this id'})
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({message: 'No thought found with this id'})
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({message: 'No thought found with this id'})
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id'})
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({message: "No thought found with this id"})
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    },
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({message: 'No thought found with this id'})
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = thoughtController;