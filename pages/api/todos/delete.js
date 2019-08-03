const connectDB = require('../../../lib/db');
const Todo = require('../../../lib/models/todo');

export default async function handle(req, res) {
  let { method, body } = req;
  const errors = [];

  // Send back generic message if method incorrect
  if (method !== 'DELETE') {
    errors.push({ msg: 'Unable to process request' });
    return res.status(400).json({ errors: errors });
  }

  try {
    // Connect to DB
    await connectDB();

    // Grab the posted data
    const { id } = JSON.parse(body);

    console.log(id);

    try {
      // Delete the todo
      await Todo.findOneAndRemove({ _id: id });
      // Find all remaining todos
      const todos = await Todo.find();
      // Send them back
      res.json({ todos: todos });
    } catch (error) {
      // If anything fails here, send error msg
      errors.push({ msg: 'Could not delete todo' });
      res.status(400).json({ errors: errors });
    }
  } catch (error) {
    // If anything fails here, send server error
    errors.push({ msg: 'Server error' });
    res.status(500).json({ errors: errors });
  }
}
