require('dotenv').config();
const mockData = require('./data.json');

const Job = require('./models/Job');
const connectDB = require('./db/connectDB');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.create(mockData);
    console.log('success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
