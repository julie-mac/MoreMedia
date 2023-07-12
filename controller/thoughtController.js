// const Thought = require('../models/thought');
const { findOneAndUpdate } = require('../models/user');

const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id)
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

const createThought = async (req, res) => {
    try {
        const result = await Thought.create(req.body);
        res.status(200).json({message: "Success! You've posted a new thought!", thought: result})
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateThought = async (req, res) => {
    try {
        const result = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$set: { thoughtText: req.body.thoughtText }},
            {new: true, runValidators: true}
        )
        res.status(200).json({message: "Thought has been updated!", thought: result});
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteThought = async (req, res) => {
    try {
        const result = await Thought.findOneAndDelete({_id: req.params.id});
        res.status(200).json({message: "Thought has been deleted", thought: result});
    } catch (err) {
        res.status(500).json(err);
    }
}

const addReaction = async (req, res) => {
    try {
        const result = await findOneAndUpdate(
            {_id: req.params.id},
            {$push: {reactions: req.body.reaction}},
            {new: true}
        );

        res.status(500).json({message: "You've added a reaction!", thought: result})
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteReaction = async (req, res) => {
    try {
        const result = await findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {reactions: {_id: req.params.reactionId}}},
            {new: true}
        );
        res.status(500).json({message: "You've delete a reaction.", thought: result})
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
}