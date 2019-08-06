const db = require('../../../lib/db');
const Todo = require('../../../lib/models/todo');

export default async function handle(req, res) {
  let { method } = req;
  const errors = [];

  // Send back generic message if method incorrect
  if (method !== 'GET') {
    errors.push({ msg: 'Unable to process request' });
    return res.status(400).json({ errors: errors });
  }

  try {
    // Connect to DB
    await db.connect();
    // Find all todos
    const todos = await Todo.find();

    // Close connection
    await db.disconnect();

    // Send them back
    res.json({ todos: todos });
  } catch (error) {
    // If anything fails here, send server error
    errors.push({ msg: 'Server error' });
    res.status(500).json({ errors: errors });
  }
}
