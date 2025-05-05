import { Router, Request, Response } from 'express';

const router: any = Router();

interface User {
  id: string;
  username: string;
  email: string;
  friends: string[];
  thoughts: string[];
}

let users: User[] = [
  { id: '1', username: 'alice', email: 'alice@example.com', friends: [], thoughts: [] },
  { id: '2', username: 'bob',   email: 'bob@example.com',   friends: [], thoughts: [] }
];

// GET all & POST new
router
  .route('/')
  .get((req: Request, res: Response) => {
    res.json(users);
  })
  .post((req: Request, res: Response) => {
    const { username, email } = req.body as Partial<User>;
    const newUser: User = {
      id: `${Date.now()}`,
      username: username || '',
      email:    email    || '',
      friends: [],
      thoughts: []
    };
    users.push(newUser);
    res.status(201).json(newUser);
  });

// GET / PUT / DELETE by :userId
router
  .route('/:userId')
  .get((req: Request, res: Response) => {
    const u = users.find(u => u.id === req.params.userId);
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  })
  .put((req: Request, res: Response) => {
    const u = users.find(u => u.id === req.params.userId);
    if (!u) return res.status(404).json({ error: 'User not found' });
    u.username = (req.body as Partial<User>).username ?? u.username;
    u.email    = (req.body as Partial<User>).email    ?? u.email;
    res.json(u);
  })
  .delete((req: Request, res: Response) => {
    users = users.filter(u => u.id !== req.params.userId);
    res.sendStatus(204);
  });

// Add / Remove friends
router
  .route('/:userId/friends/:friendId')
  .post((req: Request, res: Response) => {
    const u = users.find(u => u.id === req.params.userId);
    const f = users.find(u => u.id === req.params.friendId);
    if (!u || !f) return res.status(404).json({ error: 'User or friend not found' });
    if (!u.friends.includes(f.id)) u.friends.push(f.id);
    res.json(u);
  })
  .delete((req: Request, res: Response) => {
    const u = users.find(u => u.id === req.params.userId);
    if (!u) return res.status(404).json({ error: 'User not found' });
    u.friends = u.friends.filter(id => id !== req.params.friendId);
    res.sendStatus(204);
  });

export default router;
