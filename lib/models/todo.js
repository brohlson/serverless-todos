const mongoose = require('mongoose');

/**
 * Delete the model if it's been created already
 *
 * More on this:
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
 */
delete mongoose.connection.models['todos'];

// Create Schema
const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * This || operator export is required so we don't overwrite
 * the model when requiring it during development
 *
 * More on this:
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
 */
module.exports = mongoose.models.todos || mongoose.model('todos', TodoSchema);
