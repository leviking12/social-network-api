"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thoughtController = void 0;
const Thoughts_1 = __importDefault(require("../models/Thoughts"));
const User_1 = __importDefault(require("../models/User"));
exports.thoughtController = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts_1.default.find();
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thoughts_1.default.findById(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thoughts_1.default.create(req.body);
            await User_1.default.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thoughts_1.default.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts_1.default.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            await User_1.default.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } });
            res.json({ message: 'Thought deleted!' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thoughts_1.default.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thoughts_1.default.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
