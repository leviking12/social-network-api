"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let users = [
    { id: '1', username: 'alice', email: 'alice@example.com', friends: [], thoughts: [] },
    { id: '2', username: 'bob', email: 'bob@example.com', friends: [], thoughts: [] }
];
// GET all & POST new
router
    .route('/')
    .get((req, res) => {
    res.json(users);
})
    .post((req, res) => {
    const { username, email } = req.body;
    const newUser = {
        id: `${Date.now()}`,
        username: username || '',
        email: email || '',
        friends: [],
        thoughts: []
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
// GET / PUT / DELETE by :userId
router
    .route('/:userId')
    .get((req, res) => {
    const u = users.find(u => u.id === req.params.userId);
    if (!u)
        return res.status(404).json({ error: 'User not found' });
    res.json(u);
})
    .put((req, res) => {
    const u = users.find(u => u.id === req.params.userId);
    if (!u)
        return res.status(404).json({ error: 'User not found' });
    u.username = req.body.username ?? u.username;
    u.email = req.body.email ?? u.email;
    res.json(u);
})
    .delete((req, res) => {
    users = users.filter(u => u.id !== req.params.userId);
    res.sendStatus(204);
});
// Add / Remove friends
router
    .route('/:userId/friends/:friendId')
    .post((req, res) => {
    const u = users.find(u => u.id === req.params.userId);
    const f = users.find(u => u.id === req.params.friendId);
    if (!u || !f)
        return res.status(404).json({ error: 'User or friend not found' });
    if (!u.friends.includes(f.id))
        u.friends.push(f.id);
    res.json(u);
})
    .delete((req, res) => {
    const u = users.find(u => u.id === req.params.userId);
    if (!u)
        return res.status(404).json({ error: 'User not found' });
    u.friends = u.friends.filter(id => id !== req.params.friendId);
    res.sendStatus(204);
});
exports.default = router;
