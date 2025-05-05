"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Treat the router as `any` so TS skips overload checks
const router = (0, express_1.Router)();
let thoughts = [
    {
        id: '1',
        thoughtText: 'First in-memory thought',
        username: 'alice',
        userId: '1',
        reactions: []
    }
];
// GET all & POST new
router
    .route('/')
    .get((req, res) => {
    res.json(thoughts);
})
    .post((req, res) => {
    const { thoughtText, username, userId } = req.body;
    const newThought = {
        id: `${Date.now()}`,
        thoughtText: thoughtText || '',
        username: username || '',
        userId: userId || '',
        reactions: []
    };
    thoughts.push(newThought);
    res.status(201).json(newThought);
});
// GET / PUT / DELETE by :thoughtId
router
    .route('/:thoughtId')
    .get((req, res) => {
    const t = thoughts.find(t => t.id === req.params.thoughtId);
    if (!t)
        return res.status(404).json({ error: 'Thought not found' });
    res.json(t);
})
    .put((req, res) => {
    const t = thoughts.find(t => t.id === req.params.thoughtId);
    if (!t)
        return res.status(404).json({ error: 'Thought not found' });
    t.thoughtText = req.body.thoughtText ?? t.thoughtText;
    res.json(t);
})
    .delete((req, res) => {
    thoughts = thoughts.filter(t => t.id !== req.params.thoughtId);
    res.sendStatus(204);
});
// POST a reaction
router
    .route('/:thoughtId/reactions')
    .post((req, res) => {
    const t = thoughts.find(t => t.id === req.params.thoughtId);
    if (!t)
        return res.status(404).json({ error: 'Thought not found' });
    const { reactionBody, username } = req.body;
    const r = {
        id: `${Date.now()}`,
        reactionBody: reactionBody || '',
        username: username || '',
        createdAt: new Date().toLocaleString()
    };
    t.reactions.push(r);
    res.json(t);
});
// DELETE a reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete((req, res) => {
    const t = thoughts.find(t => t.id === req.params.thoughtId);
    if (!t)
        return res.status(404).json({ error: 'Thought not found' });
    t.reactions = t.reactions.filter(r => r.id !== req.params.reactionId);
    res.sendStatus(204);
});
exports.default = router;
