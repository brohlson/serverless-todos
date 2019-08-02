require('dotenv').config();
const mongoose = require('mongoose');
const db =
  'mongodb+srv://todo_admin:todo_password@development-peftj.mongodb.net/test?retryWrites=true&w=majority';

// Prevent Overwriting
delete mongoose.connection.models['client'];

const connectDatabase = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
  } catch (error) {
    console.error(error.message); // eslint-disable-line
    process.exit(1);
  }
};

module.exports = connectDatabase;
