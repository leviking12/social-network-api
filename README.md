# social-network-api

Social Network API (In-Memory Stub)
A simple Express + TypeScript JSON API simulating a social network with Users, Thoughts, Friends, and Reactions. All data is stored in-memory and reset on server restart—ideal for rapid prototyping and frontend integration without a database.

🔧 Prerequisites
Node.js ≥ 14

npm (bundled with Node.js)

# 🚀 Installation
Clone the repo

git clone https://github.com/your-username/social-api-stub.git
cd social-api-stub
Install dependencies

npm install
Build & run

npm run build
npm run dev

The server will listen on http://localhost:3001/api by default.

# 📦 Project Structure
pgsql
Copy
Edit
.
├── src
│   ├── routes
│   │   ├── api
│   │   │   ├── userRoutes.ts
│   │   │   └── thoughtRoutes.ts
│   │   └── index.ts
│   ├── server.ts
│   └── tsconfig.json
├── package.json
└── README.md
🔗 Endpoints
All routes are prefixed with /api

# Users
Method	Path	Description	Body (JSON)
GET	/users	List all users	—
POST	/users	Create a new user	{ "username": "...", "email": "..." }
GET	/users/:userId	Get a single user by ID	—
PUT	/users/:userId	Update a user’s details	{ "username": "...", "email": "..." }
DELETE	/users/:userId	Remove a user	—
POST	/users/:userId/friends/:friendId	Add friendId to userId’s friend list	—
DELETE	/users/:userId/friends/:friendId	Remove friendId from userId’s friends	—

# Thoughts
Method	Path	Description	Body (JSON)
GET	/thoughts	List all thoughts	—
POST	/thoughts	Create a new thought	{ "thoughtText":"...", "username":"...", "userId":"..." }
GET	/thoughts/:thoughtId	Get a single thought by ID	—
PUT	/thoughts/:thoughtId	Update a thought’s text	{ "thoughtText":"Updated text" }
DELETE	/thoughts/:thoughtId	Remove a thought	—
POST	/thoughts/:thoughtId/reactions	Add a reaction to a thought	{ "reactionBody":"...", "username":"..." }
DELETE	/thoughts/:thoughtId/reactions/:reactionId	Remove a reaction from a thought	—