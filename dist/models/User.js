"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must be a valid email address'],
    },
    thoughts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, {
    toJSON: { virtuals: true, getters: true },
    id: false,
});
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
exports.default = (0, mongoose_1.model)('User', userSchema);
