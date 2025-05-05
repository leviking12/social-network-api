"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reaction_1 = require("./reaction");
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        get: (ts) => ts.toLocaleString(),
    }, // ← cast here too
    username: {
        type: String,
        required: true,
    },
    reactions: [reaction_1.reactionSchema],
}, {
    toJSON: { virtuals: true, getters: true },
    id: false,
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
exports.default = (0, mongoose_1.model)('Thought', thoughtSchema);
