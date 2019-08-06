const db = require('../../../lib/db');
const Todo = require('../../../lib/models/todo');

export default async function handle(req, res) {
  let { method, body } = req;
  const errors = [];

  // Send back generic message if method incorrect
  if (method !== 'POST') {
    errors.push({ msg: 'Unable to process request' });
    return res.status(400).json({ errors: errors });
  }

  try {
    // Connect to DB
    await db.connect();

    // Grab the posted data
    const { name } = JSON.parse(body);

    // Create a new todo
    let todo = new Todo({
      name: name,
    });
    await todo.save();

    // Close connection
    await db.disconnect();

    // Send back the new todo
    res.json({ todo: todo });
  } catch (error) {
    // If anything fails here, send server error
    errors.push({ msg: 'Server error' });
    res.status(400).json({ errors: error });
  }
}
