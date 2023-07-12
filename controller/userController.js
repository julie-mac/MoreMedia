const User = require('./models/user');
const Thought = require('./models/thought')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        .populate('thoughts')
        .populate({
            path: 'friends',
            model: 'User'
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const users = await User.findById(req.params.id)
        .populate('thoughts')
        .populate({
            path: 'friends',
            model: 'User'
        });
        //Displays message is no user if found with ID given
        if(!user) {
            res.status(404).json({message: "No user found with that ID!"})
            return;
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

const createUser = async (req, res) => {
    try {
        const result = await User.create(req.body);
        res.status(200).json({message: 'Success! New user has been created!', user: result})
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const result = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: { username: req.body.username, email: req.body.email }},
            {new: true, runValidators: true}
        )
        res.status(200).json({message: "User has been updated!", user: result});
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        //Deleting the user's thoughts
        const userId = req.params.id;
        const user = await User.findById(userId);
        const username = user.username;
        await Thought.deleteMany({username: username});

        //Deleting the user after we delete their thoughts
        const result = await User.findOneAndDelete({_id: userId});
        res.status(200).json({message: "User has been deleted!", user: result});
    } catch (err) {
        res.status(500).json(err);
    }
};

const addFriend = async (req,res) => {
    try {
        const userId = req.params.id;
        const friendId = req.params.friendId;

        // Updating the given user's friend list
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {$push: {friends: friendId}},
            {new: true}
        );

        //Also adding the user to the other friend's friend list!
        const updatedFriend = await User.findByIdAndUpdate(
            friendId,
            {$push: {friends: userId}},
            {new: true}
        );
        
        res.status(500).json({message: "A friend has been added!", user: updateUser});
    } catch (err) {
        res.status(500).json(err);
    }
};

const removeFriend = async (req,res) => {
    try {
        const userId = req.params.id;
        const friendId = req.params.friendId;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {$pull: {friends: friendId}},
            {new: true}
        );
        
        const updatedFriend = await User.findByIdAndUpdate(
            friendId,
            {$pull: {friends: userId}},
            {new: true}
        );
        
        res.status(500).json({message: "You deleted your friend :(", user: updateUser});
    } catch(err) {
        res.status(500).json(err);
    }
}


module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
}