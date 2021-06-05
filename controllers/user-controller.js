const {User} = require('../models');

const userController = {
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(allUsers => res.json(allUsers))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getOneUser({params}, res) {
        User.findOne({_id: params.id})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id'});
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id'})
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this id'})
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this data'})
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({message: 'No user found with this data'})
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = userController;