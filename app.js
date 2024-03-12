//==============
//IMPORTS
//==============

require('dotenv').config();
require('express-async-errors');
const path = require('path');

//==============
//extra security packages
//==============

const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//==============
//Express setup
//==============
const express = require('express');
const app = express();

//=============
//DB Connection import
//=============

const connectDB = require('./db/connectDB');

const authenticateUser = require('./middleware/authentification');
//=============
//routers
//=============

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

//=============
// error handler import
//=============

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//==============
// Express-Rate-Limiter REQUEST
//==============

app.set('trust proxy', 1);

//=============
//Security
//=============

app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(express.json());
app.use(helmet());
app.use(xss());

//=============
//routes
//=============
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

//=============
//Front-End-Connection-URL
//=============

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

//=============
//Error Middleware
//=============
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//=============
//app starter func
//=============

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, console.log(`Server is listening on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
