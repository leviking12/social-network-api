"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Thoughts_1 = __importDefault(require("../models/Thoughts"));
exports.userController = {
    async getUsers(req, res) {
        try {
            const users = await User_1.default.find();
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User_1.default.findById(req.params.userId)
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User_1.default.create(req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User_1.default.findByIdAndDelete(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            await Thoughts_1.default.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
