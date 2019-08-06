require('dotenv').config();
const mongoose = require('mongoose');
const db =
  'mongodb+srv://todo_admin:todo_password@development-peftj.mongodb.net/test?retryWrites=true&w=majority';

// Prevent Overwriting
delete mongoose.connection.models['client'];

const connect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log('Mongo DB Connected: ', new Date().toISOString());
  } catch (error) {
    console.error(error.message); // eslint-disable-line
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    await mongoose.connection.close();
    console.log('Mongo DB Closed: ', new Date().toISOString());
  } catch (error) {
    console.error(error.message); // eslint-disable-line
    process.exit(1);
  }
};

module.exports = { connect, disconnect };
