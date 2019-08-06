const db = require('../../../lib/db');
const Todo = require('../../../lib/models/todo');

export default async function handle(req, res) {
  let { method, body } = req;
  const errors = [];

  // Send back generic message if method incorrect
  if (method !== 'PATCH') {
    errors.push({ msg: 'Unable to process request' });
    return res.status(400).json({ errors: errors });
  }

  try {
    // Connect to DB
    await db.connect();

    // Grab the posted data
    const { id, completed, name } = JSON.parse(body);
    const fields = {};
    fields._id = id;

    // Top level fields
    if (String(completed)) fields.completed = completed;
    if (name) fields.name = name;

    try {
      // Find the todo & update it
      const todo = await Todo.findOneAndUpdate(
        { _id: fields._id },
        { $set: fields },
        { new: true }
      );
      // Close connection
      await db.disconnect();
      // Send it back
      res.json({ todo: todo });
    } catch (error) {
      // If anything fails here, send error msg
      errors.push({ msg: 'Could not update todo' });
      res.status(400).json({ errors: errors });
    }
  } catch (error) {
    // If anything fails here, send server error
    errors.push({ msg: 'Server error' });
    res.status(500).json({ errors: errors });
  }
}
