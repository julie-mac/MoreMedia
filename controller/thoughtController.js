const Thought = require('../models/thought');

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
        const thoughts = await Thought.find({ _id: req.params.id })
        res.status(200).json(thoughts);
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
            {$set: { name: req.body.name, type: req.body.type}},
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

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought
}