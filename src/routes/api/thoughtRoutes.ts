import { Router, Request, Response } from 'express';

// Treat the router as `any` so TS skips overload checks
const router: any = Router();

interface Reaction {
  id: string;
  reactionBody: string;
  username: string;
  createdAt: string;
}

interface Thought {
  id: string;
  thoughtText: string;
  username: string;
  userId: string;
  reactions: Reaction[];
}

let thoughts: Thought[] = [
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
  .get((req: Request, res: Response) => {
    res.json(thoughts);
  })
  .post((req: Request, res: Response) => {
    const { thoughtText, username, userId } = req.body as Partial<Thought>;
    const newThought: Thought = {
      id: `${Date.now()}`,
      thoughtText: thoughtText || '',
      username:    username    || '',
      userId:      userId      || '',
      reactions: []
    };
    thoughts.push(newThought);
    res.status(201).json(newThought);
  });

// GET / PUT / DELETE by :thoughtId
router
  .route('/:thoughtId')
  .get((req: Request, res: Response) => {
    const t = thoughts.find(t => t.id === req.params.thoughtId);
    if (!t) return res.status(404).json({ error: 'Thought not found' });
    res.json(t);
  })
  .put((req: Request, res: Response) => {
    const t = thoughts.find(t => t.id === req.params.thoughtId);
    if (!t) return res.status(404).json({ error: 'Thought not found' });
    t.thoughtText = (req.body as Partial<Thought>).thoughtText ?? t.thoughtText;
    res.json(t);
  })
  .delete((req: Request, res: Response) => {
    thoughts = thoughts.filter(t => t.id !== req.params.thoughtId);
    res.sendStatus(204);
  });

// POST a reaction
router
  .route('/:thoughtId/reactions')
  .post((req: Request, res: Response) => {
    const t = thoughts.find(t => t.id === req.params.thoughtId);
    if (!t) return res.status(404).json({ error: 'Thought not found' });
    const { reactionBody, username } = req.body as Partial<Reaction>;
    const r: Reaction = {
      id: `${Date.now()}`,
      reactionBody: reactionBody || '',
      username:     username     || '',
      createdAt: new Date().toLocaleString()
    };
    t.reactions.push(r);
    res.json(t);
  });

// DELETE a reaction
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete((req: Request, res: Response) => {
    const t = thoughts.find(t => t.id === req.params.thoughtId);
    if (!t) return res.status(404).json({ error: 'Thought not found' });
    t.reactions = t.reactions.filter(r => r.id !== req.params.reactionId);
    res.sendStatus(204);
  });

export default router;
