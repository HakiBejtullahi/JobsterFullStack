require('dotenv').config();

const Job = require('./models/Job');
const connectDB = require('./db/connectDB');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany({ createdBy: '65edd92b88c9005974ea19d4' });
    console.log('success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
