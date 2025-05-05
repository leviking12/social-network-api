"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionSchema = void 0;
// src/models/reaction.ts
const mongoose_1 = require("mongoose");
exports.reactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        get: (ts) => ts.toLocaleString(),
    },
}, {
    toJSON: { getters: true },
    id: false,
});
